package com.example.backend.backend.Service;

import com.example.backend.backend.Entity.*;
import com.example.backend.backend.Entity.Enum_Key.CartKey;
import com.example.backend.backend.Entity.Enum_Key.EStatus;
import com.example.backend.backend.Entity.Enum_Key.ProductQuantityKey;
import com.example.backend.backend.Payload.Cart.PostCart;
import com.example.backend.backend.Payload.Order.OrderInfo;
import com.example.backend.backend.Payload.Response.NotificationMessage;
import com.example.backend.backend.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.*;

@Service
@Transactional
public class UserServiceImpl implements UserService{
    //khai báo các repository cần thiết
    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final ColorRepository colorRepository;
    private final SizeRepository sizeRepository;
    private final CartRepository cartRepository;
    private final ProductQuantityRepository productQuantityRepository;
    private final OrderRepository orderRepository;
    private final TransactionRepository transactionRepository;
    private final NotificationRepository notificationRepository;
    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, ProductRepository productRepository, ColorRepository colorRepository, SizeRepository sizeRepository, CartRepository cartRepository, ProductQuantityRepository productQuantityRepository, OrderRepository orderRepository, TransactionRepository transactionRepository, NotificationRepository notificationRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.colorRepository = colorRepository;
        this.sizeRepository = sizeRepository;
        this.cartRepository = cartRepository;
        this.productQuantityRepository = productQuantityRepository;
        this.orderRepository = orderRepository;
        this.transactionRepository = transactionRepository;
        this.notificationRepository = notificationRepository;
    }
    //Lấy ra người dùng từ tài khoản
    @Override
    public Optional<User> getByAccount(String account) {
        return userRepository.findByAccount(account);
    }

    //Lấy ra người dùng từ id
    @Override
    public Optional<User> getById(String id) {
        return userRepository.findById(id);
    }

    //kiếm tra người dùng có tồn tại không
    @Override
    public boolean existByAccount(String account) {
        return userRepository.existsByAccount(account);
    }

    //Lưu thông tin người dùng
    @Override
    @Transactional
    public void save(User user) {
        userRepository.save(user);
    }

    //thêm sản phẩm vào giỏ hàng
    @Override
    public void addProductToCart(PostCart postCart, String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepository.findById(postCart.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Color color = colorRepository.findById(postCart.getColorId())
                .orElseThrow(() -> new RuntimeException("Color not found"));

        Size size = sizeRepository.findById(postCart.getSizeId())
                .orElseThrow(() -> new RuntimeException("Size not found"));

        // Tìm sản phẩm trong giỏ hàng với cùng một màu sắc và kích thước
        Optional<Cart> existingCartItem = user.getCarts().stream()
                .filter(cart -> cart.getProduct().equals(product) &&
                        cart.getColor().equals(color) &&
                        cart.getSize().equals(size))
                .findFirst();

        if (existingCartItem.isPresent()) {
            // Nếu sản phẩm đã tồn tại trong giỏ hàng, cộng thêm số lượng
            Cart cart = existingCartItem.get();
            cart.setQuantity(cart.getQuantity() + postCart.getQuantity());
        } else {
            // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm mới
            Cart newCart = new Cart(product, size, color, user, postCart.getQuantity(), product.getCost());
            user.getCarts().add(newCart);
        }

        userRepository.save(user);
    }

    //Lấy ra các sản phẩm đang có trong giỏ hàng
    @Override
    public List<Cart> getCart(String userId) {
        User user= userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getCarts();
    }

    //xóa các sản phẩm được chọn khỏi giỏ hàng
    @Override
    public boolean delete(PostCart postCart, String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepository.findById(postCart.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Color color = colorRepository.findById(postCart.getColorId())
                .orElseThrow(() -> new RuntimeException("Color not found"));

        Size size = sizeRepository.findById(postCart.getSizeId())
                .orElseThrow(() -> new RuntimeException("Size not found"));

        // Tìm sản phẩm trong giỏ hàng với cùng một màu sắc và kích thước
        CartKey cartKey = new CartKey(product,  color,size, user);
        Optional<Cart> existingCartItem = cartRepository.findById(cartKey);
        if (existingCartItem.isPresent()) {
            cartRepository.delete(existingCartItem.get());
            return true;
        }
        return false;
    }

    //danh sách tài khoản có email xác định
    @Override
    public List<User> getAllByEmail(String email) {
        return userRepository.getAllByEmail(email);
    }

    //tạo đơn hàng của người dùng
    @Override
    public String postOrder(OrderInfo orderInfo, String userId) {
        Order order= new Order();
        order.setDeliveryCost(orderInfo.getDeliveryCost());
        order.setPayments(orderInfo.getPayments());
        order.setTotalCost(orderInfo.getTotalCost());

        List<PostCart> postCarts= orderInfo.getPostCarts();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<ProductOrder> productOrders= new ArrayList<>();
        order.setUser(user);
        order.setTime(new Timestamp(System.currentTimeMillis()));
        orderRepository.save(order);
        for (PostCart postCart:postCarts
             ) {
            Product product = productRepository.findById(postCart.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            Color color = colorRepository.findById(postCart.getColorId())
                    .orElseThrow(() -> new RuntimeException("Color not found"));

            Size size = sizeRepository.findById(postCart.getSizeId())
                    .orElseThrow(() -> new RuntimeException("Size not found"));
            CartKey cartKey = new CartKey(product,  color,size, user);
            Optional<Cart> existingCartItem = cartRepository.findById(cartKey);

            if(!existingCartItem.isPresent()){
                Optional<ProductQuantity> quantity= productQuantityRepository.findById(new ProductQuantityKey(product,color,size));
                if(quantity.isPresent()){
                    System.out.println("a");
                    ProductQuantity quantity1= quantity.get();
                    if(quantity.get().getQuantity()<postCart.getQuantity())
                    {
                        orderRepository.delete(order);
                        return product.getName()+" chỉ còn " +quantity.get().getQuantity()+" sản phẩm!";
                    }
                    else{
                        productOrders.add(new ProductOrder(product,size,color,order,postCart.getQuantity(),postCart.getCost()));
                        quantity1.setQuantity(quantity.get().getQuantity()-postCart.getQuantity());
                        productQuantityRepository.save(quantity1);

//                        cartRepository.delete(existingCartItem.get());
                    }
                }else{
                    return "Sản phẩm "+product.getName()+" với loại "+size.getName()+" không tồn tại hoặc đã hết hàng";
                }
            }else{
                Optional<ProductQuantity> quantity= productQuantityRepository.findById(new ProductQuantityKey(product,color,size));
                if(quantity.isPresent()){
                    System.out.println("a");
                    ProductQuantity quantity1= quantity.get();
                    if(quantity.get().getQuantity()<postCart.getQuantity())
                    {
                        orderRepository.delete(order);
                        return product.getName()+" chỉ còn " +quantity.get().getQuantity()+" sản phẩm!";
                    }
                    else{
                        productOrders.add(new ProductOrder(product,size,color,order,postCart.getQuantity(),postCart.getCost()));
                        quantity1.setQuantity(quantity.get().getQuantity()-postCart.getQuantity());
                        productQuantityRepository.save(quantity1);

                        cartRepository.delete(existingCartItem.get());
                    }
                }else{
                    return "Sản phẩm "+product.getName()+" với loại "+size.getName()+" không tồn tại hoặc đã hết hàng";
                }
            }

        }
        order.setProducts(productOrders);
//        List<Order> orders= user.getOrders();
//        orders.add(order);
//        user.setOrders(orders);
//        userRepository.save(user);
        orderRepository.save(order);
        NotificationMessage notificationMessage= new NotificationMessage("1 đơn hàng trị giá "+ orderInfo.getTotalCost() +" vừa được khởi tạo!",new Date(),"System",true);
        messagingTemplate.convertAndSend("/topic-admin", notificationMessage);
        Notification notification= new Notification(new java.sql.Date(System.currentTimeMillis()), notificationMessage.getContent(), user,0,true,false);
        notificationRepository.save(notification);
        return "Đã đặt hàng thành công, chờ xử lý!_"+order.getId();
    }

    @Override
    public Order getOrder(String userId, int orderId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Order order= orderRepository.findById(orderId)
                .orElseThrow(()->new RuntimeException("order not found"));
        if(order.getUser().getId().equals(user.getId()))
        {
            return order;
        }
        return null;
    }

    @Override
    public Order putOrder(int orderId, EStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(()->new RuntimeException("order not found"));
        order.setStatus(status);
        if(status.equals(EStatus.SUCCESS)){
            for (ProductOrder productOrder :order.getProducts()
                    ) {
                Product product= productOrder.getProduct();
                product.setSaleCount(product.getSaleCount()+productOrder.getQuantity());

            }
        }
        orderRepository.save(order);
        return order;
    }

    //Lấy ra các đơn hàng của người dùng
    @Override
    public List<Order> getOrders(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        List<Order> orders= user.getOrders();
        Collections.reverse(orders);
        return  orders;
    }

    //Hủy đơn hàng (không xóa)
    @Override
    public boolean cancelOrder(String userId, int orderId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Order orderr= orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        List<Order> orders = user.getOrders();
        for (Order order : orders) {
            if (order.getId() == orderId ) {
                List<ProductOrder> products = order.getProducts();
                for (ProductOrder productOrder:products
                     ) {
                  Optional<ProductQuantity> productQuantity = productQuantityRepository.findById(new ProductQuantityKey(productOrder.getProduct(),productOrder.getColor(),productOrder.getSize()));
                  if(productQuantity.isPresent()){
                      ProductQuantity productQuantity1= productQuantity.get();
                      productQuantity1.setQuantity(productQuantity.get().getQuantity()+productOrder.getQuantity());
                      productQuantityRepository.save(productQuantity1);
                  }
                }
                orderr.setStatus(EStatus.CANCELLED);
                orderRepository.save(order);
                return true;
            }
        }
        return false;
    }

    @Override
    public void createTransaction(User user, Long amount, int orderId) {
        Transaction transaction= new Transaction(amount,user,new Timestamp(System.currentTimeMillis()),"process", orderId);
        transactionRepository.save(transaction);
    }

    @Override
    public boolean completeTransaction(User user, Long amount, int orderId) {
        List<Transaction> transactions= transactionRepository.findAllByUser(user);

        long currentTimeMillis = System.currentTimeMillis()-15*60*1000;
        Timestamp timestamp1 = new Timestamp(currentTimeMillis);
        for (Transaction transaction :
                transactions) {
//            System.out.println(amount);
            if (transaction.getStatus().equals("process") && transaction.getMoney().equals(amount) && orderId == transaction.getOrderId()) {
                Timestamp timestamp2 = transaction.getTime();
//                System.out.println(timestamp2);
//                System.out.println(timestamp1);
                if (timestamp1.after(timestamp2)) {
                    System.out.println(timestamp1);
                    continue;
                }
//                System.out.println(amount);
                transaction.setStatus("done");
                Order order= orderRepository.findById(orderId)
                        .orElseThrow(()-> new RuntimeException("order not found"));
                order.setPaymentStatus(true);
                for (ProductOrder productOrder:order.getProducts()
                     ) {
                    Product product= productOrder.getProduct();
                    product.setSaleCount(product.getSaleCount()+productOrder.getQuantity());
                    productRepository.save(product);
                }
                return  true;
            }
        }
        return  false;
    }

    @Override
    public List<Notification> getNotifications(User user) {
        return notificationRepository.findAllByUser(user);
    }

    @Override
    public List<String> getAllDistinctByEmail() {
        return userRepository.findDistinctEmails();
    }

}
