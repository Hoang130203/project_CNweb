package com.example.backend.backend.Service;

import com.example.backend.backend.Entity.*;
import com.example.backend.backend.Entity.Enum_Key.EType;
import com.example.backend.backend.Entity.Enum_Key.RateKey;
import com.example.backend.backend.Payload.Product.*;
import com.example.backend.backend.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {
    //Khai báo các repository cần thiết

    @Autowired
    private ProductRepository productRepository;
    private final UserRepository userRepository;
    private final RateRepository rateRepository;
    private final CommentRepository commentRepository;
    private final ProductImageRepository productImageRepository;
    private final ColorRepository colorRepository;
    private final SizeRepository sizeRepository;
    private final OrderRepository orderRepository;
    private final ProductOrderRepository productOrderRepository;
    private final ProductQuantityRepository productQuantityRepository;
    private final CartRepository cartRepository;
    public ProductServiceImpl(UserRepository userRepository, RateRepository rateRepository, CommentRepository commentRepository, ProductImageRepository productImageRepository, ColorRepository colorRepository, SizeRepository sizeRepository, OrderRepository orderRepository, ProductOrderRepository productOrderRepository, ProductQuantityRepository productQuantityRepository, CartRepository cartRepository) {
        this.userRepository = userRepository;
        this.rateRepository = rateRepository;
        this.commentRepository = commentRepository;
        this.productImageRepository = productImageRepository;
        this.colorRepository = colorRepository;
        this.sizeRepository = sizeRepository;
        this.orderRepository = orderRepository;
        this.productOrderRepository = productOrderRepository;
        this.productQuantityRepository = productQuantityRepository;
        this.cartRepository = cartRepository;
    }

    //lưu sản phẩm
    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }

    //lấy tất cả sản phẩm
    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    //lấy ra 12 sản phẩm mới nhất
    @Override
    public List<Product> getNewest() {
        Pageable pageable = PageRequest.of(0, 12);
        return productRepository.findTop12Product(pageable);
    }

    //Lấy ra các sản phẩm thuộc loại xác định
    @Override
    public List<Product> getProductByType(EType type) {
        return productRepository.findProductByType(type);
    }

    //lấy sản phẩm chi tiết thông qua id sản phẩm
    @Override
    public Product getProduct(int id) {
        Optional<Product> o_product= productRepository.findById(id);
        if (o_product.isPresent())
        {
            return o_product.get();
        }
        else{
            return null;
        }
    }

    //lấy thông tin đánh giá của người dùng
    @Override
    public Rate getRate(int productId, String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Product product= productRepository.findById(productId)
                .orElseThrow(()->new RuntimeException("Product not found"));
        Optional<Rate> rate = rateRepository.findById(new RateKey(product,user));

        return rate.isPresent()?rate.get():null;
    }


    //tạo đánh giá của người dùng và lưu
    @Override
    public Rate postRate(int productId, String userId, int rate) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Product product= productRepository.findById(productId)
                .orElseThrow(()->new RuntimeException("Product not found"));
        Optional<Rate> r= rateRepository.findById(new RateKey(product,user));
        if(r.isPresent()){
            Rate rate1= r.get();
            product.setRate((product.getRateCount()*product.getRate()+(rate-rate1.getRate()))/product.getRateCount());
            rate1.setRate(rate);
            productRepository.save(product);
            rateRepository.save(rate1);
            return rate1;
        }else{
            Rate rate1= new Rate(product,user,rate);
            product.setRate((product.getRateCount()*product.getRate()+rate1.getRate())/(product.getRateCount()+1));
            product.setRateCount(product.getRateCount()+1);
            productRepository.save(product);
            rateRepository.save(rate1);
            return rate1;
        }

    }

    //tạo bình luận và lưu vào csdl
    @Override
    public Comment postComment(String userId, CommentReq commentReq) {
        User user= userRepository.findById(userId)
                .orElseThrow(()->new RuntimeException("User not found"));
        Product product= productRepository.findById(commentReq.getProductId())
                .orElseThrow(()->new RuntimeException("Product not found"));
        Comment comment= new Comment(product,user,commentReq.getContent(),commentReq.getPicture(),new Timestamp(System.currentTimeMillis()));
        commentRepository.save(comment);

        return comment;
    }

    //lấy ra dánh sách comment của 1 người đối vơi 1 sản phẩm
    @Override
    public List<Comment> getComments(String userId, int productId) {
        User user= userRepository.findById(userId)
                .orElseThrow(()->new RuntimeException("User not found"));
        Product product= productRepository.findById(productId)
                .orElseThrow(()->new RuntimeException("Product not found"));
        List<Comment> comments= commentRepository.findCommentsByUserAndProduct(user,product);
        return comments;
    }

    @Override
    public Product createProduct(ProductCreateReq productCreateReq) {
        Product product= new Product();
        product.setBrand(productCreateReq.getBrand());
        product.setName(productCreateReq.getName());
        product.setCost(productCreateReq.getCost());
        product.setPromotion(productCreateReq.getPromotion());
        product.setOrigin(productCreateReq.getOrigin());
        product.setDescription(productCreateReq.getDescription());
        product.setType(productCreateReq.getType());
        List<Size> sizes= new ArrayList<>();
        for (Size size:productCreateReq.getSizes()
             ) {
            Size size1= sizeRepository.findById(size.getId())
                    .orElseThrow(()->new RuntimeException("size not found"));
            sizes.add(size1);
        }
        product.setSizes(sizes);
        List<Color> colors= new ArrayList<>();
        for (Color color:productCreateReq.getColors()
             ) {
            Color color1= colorRepository.findById(color.getId())
                    .orElseThrow(()->new RuntimeException("color not found"));
            colors.add(color1);
        }
        product.setColors(colors);
        productRepository.save(product);
        for (ProductImage productImage:productCreateReq.getImages()
             ) {
            productImage.setProduct(product);
            productImageRepository.save(productImage);
        }

        // Tạo và lưu số lượng sản phẩm tương ứng với các kích thước và màu sắc
        for (Color color : colors) {
            for (Size size : sizes) {
                ProductQuantity productQuantity = new ProductQuantity(product,size, color, 1);
                productQuantityRepository.save(productQuantity);
            }
        }
        return product;
    }

    @Override
    public List<Size> getAllSize() {
        return sizeRepository.findAll();
    }

    @Override
    public Product putBaseInfo(InfoProduct infoProduct) {
        Product product= productRepository.findById(infoProduct.getId())
                .orElseThrow(()->new RuntimeException("product not found"));
        product.setOrigin(infoProduct.getOrigin());
        product.setName(infoProduct.getName());
        product.setType(infoProduct.getType());
        product.setDescription(infoProduct.getDescription());
        product.setBrand(infoProduct.getBrand());
        product.setCost(infoProduct.getCost());
        product.setPromotion(infoProduct.getPromotion());
        productRepository.save(product);
        return product;
    }

    @Override
    @Transactional
    public List<ProductQuantity> putQuantity(ProductQuantityChange productQuantityChange) {
        Product product= productRepository.findById(productQuantityChange.getProductId())
                .orElseThrow(()->new RuntimeException("product not found!"));
//        if(product.getProductQuantities().size()!=productQuantityChange.getOldListProductQuantitiy().size()){
            for (ProductQuantity productQuantity1:product.getProductQuantities()
                 ) {
                boolean isExists= false;
                for (ProductQuantity productQuantity:productQuantityChange.getOldListProductQuantitiy()
                ) {
                    if((productQuantity.getColor().getId()==productQuantity1.getColor().getId())&&(productQuantity.getSize().getId()==productQuantity1.getSize().getId())){
                        System.out.println("hearrrr");
                        productQuantity1.setQuantity(productQuantity.getQuantity());
                        productQuantityRepository.save(productQuantity1);
                        isExists=true;
                    }
                }
                if(!isExists){
                    productQuantityRepository.delete(productQuantity1);
                }
            }
//        }
        if(productQuantityChange.getNewListProductQuantity().size()>0){
            System.out.println("new new new");

            for (ProductQuantity productQuantity:productQuantityChange.getNewListProductQuantity()
            ) {
                boolean isExists= false;
                for (ProductQuantity productQuantity1:product.getProductQuantities()
                ) {
                    if((productQuantity.getColor().getId()==productQuantity1.getColor().getId())&&(productQuantity.getSize().getId()==productQuantity1.getSize().getId())){
                        isExists=true;
                        productQuantity1.setQuantity(productQuantity1.getQuantity()+productQuantity.getQuantity());
                        productQuantityRepository.save(productQuantity1);
                    }
                }
                if(!isExists){
                    Color color= colorRepository.findById(productQuantity.getColor().getId())
                            .orElseThrow(()->new RuntimeException("color not found"));
                    Size size=sizeRepository.findById(productQuantity.getSize().getId())
                            .orElseThrow(()->new RuntimeException("size not found"));
                    productQuantity.setColor(color);
                    productQuantity.setSize(size);
                    productQuantity.setProduct(product);
                    productQuantityRepository.save(productQuantity);
                    boolean isExistsColor=false;
                    boolean isExistsSize=false;
                    for (Color color1:product.getColors()
                         ) {
                        if(color1.getId()==color.getId()){
                            isExistsColor=true;
                        }
                    }
                    if(!isExistsColor){
                        product.getColors().add(color);
                    }
                    for (Size size1:product.getSizes()
                         ) {
                        if(size1.getId()==size.getId()){
                            isExistsSize=true;
                        }
                    }
                    if(!isExistsSize){
                        product.getSizes().add(size);
                    }
                    productRepository.save(product);

                }
            }
        }else {

        }

        return product.getProductQuantities();
    }

    @Override
    @Transactional
    public List<ProductImage> putImages(ImageChangeReq imageChangeReq) {
        for (ProductImage productImage:imageChangeReq.getProductImagesDelete()
             ) {
            ProductImage productImage1= productImageRepository.findById(productImage.getId())
                    .orElseThrow(()-> new RuntimeException("image not found"));
            productImageRepository.delete(productImage1);
        }
        Product product= productRepository.findById(imageChangeReq.getProductId())
                .orElseThrow(()->new RuntimeException("product not found"));
        for (ProductImage productImage:imageChangeReq.getNewProductImages()
             ) {
            ProductImage productImage1= new ProductImage();
            productImage1.setUrl(productImage.getUrl());
            productImage1.setProduct(product);
            productImageRepository.save(productImage1);
        }
        return product.getImages();
    }

    @Override
    public Page<Product> findAllByKeyword(String keyword, Pageable pageable) {
        return productRepository.findAllByNameContainingIgnoreCase(keyword,pageable);
    }

    @Override
    public long countOrdersToday() {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.atTime(LocalTime.MAX);

        return orderRepository.countOrdersToday(Timestamp.valueOf(startOfDay), Timestamp.valueOf(endOfDay));
    }

    @Override
    public Long totalCostToday() {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.atTime(LocalTime.MAX);

        return orderRepository.getTotalCostToday(Timestamp.valueOf(startOfDay), Timestamp.valueOf(endOfDay)); }

    @Override
    public long countOrdersThisWeek() {
        LocalDate today = LocalDate.now();
        LocalDate startOfWeekDate = today.minusDays(6); // 7 ngày bao gồm hôm nay
        LocalDateTime startOfWeek = startOfWeekDate.atStartOfDay();
        LocalDateTime endOfDay = today.atTime(LocalTime.MAX);

        return orderRepository.countOrdersThisWeek(Timestamp.valueOf(startOfWeek), Timestamp.valueOf(endOfDay));
    }

    @Override
    public Long totalCostThisWeek() {
        LocalDate today = LocalDate.now();
        LocalDate startOfWeekDate = today.minusDays(6); // Tính từ 7 ngày trước
        LocalDateTime startOfWeek = startOfWeekDate.atStartOfDay();
        LocalDateTime endOfDay = today.atTime(LocalTime.MAX);

        return orderRepository.getTotalCostLast7Days(Timestamp.valueOf(startOfWeek), Timestamp.valueOf(endOfDay));
    }

    @Override
    public List<Object[]> findallCostMonth(int month) {
        LocalDateTime now = LocalDateTime.now();
        YearMonth currentYearMonth = YearMonth.of(now.getYear(), month);
        LocalDateTime startOfMonth = currentYearMonth.atDay(1).atStartOfDay();
        LocalDateTime startOfNextMonth = currentYearMonth.plusMonths(1).atDay(1).atStartOfDay();

        return productOrderRepository.findTotalCostOfMobileProductsLast6Months(
                Timestamp.valueOf(startOfMonth),
                Timestamp.valueOf(startOfNextMonth));
    }
    @Transactional
    @Override
    public boolean deleteProduct(int id) {
        Product product= productRepository.findById(id)
                .orElseThrow(()->new RuntimeException("product not found"));
        List<ProductQuantity> productQuantities= productQuantityRepository.findAllByProduct(product);
        for (ProductQuantity productQuantity:productQuantities
             ) {
            productQuantityRepository.delete(productQuantity);
        }
        List<Comment> comments= commentRepository.findAllByProduct(product);
        for (Comment comment: comments
             ) {
            commentRepository.delete(comment);
        }
        List<Rate> rates= rateRepository.findAllByProduct(product);
        for (Rate rate: rates){
            rateRepository.delete(rate);
        }
        productOrderRepository.deleteProductOrders(product);
        cartRepository.deleteAllByProduct(product);
        productImageRepository.deleteAllByProduct(product);
        productRepository.delete(product);
        return true;
    }
}
