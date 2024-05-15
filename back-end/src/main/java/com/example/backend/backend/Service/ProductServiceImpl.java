package com.example.backend.backend.Service;

import com.example.backend.backend.Entity.*;
import com.example.backend.backend.Entity.Enum_Key.EType;
import com.example.backend.backend.Entity.Enum_Key.RateKey;
import com.example.backend.backend.Payload.Product.CommentReq;
import com.example.backend.backend.Payload.Product.ProductCreateReq;
import com.example.backend.backend.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
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
    private final ProductQuantityRepository productQuantityRepository;
    public ProductServiceImpl(UserRepository userRepository, RateRepository rateRepository, CommentRepository commentRepository, ProductImageRepository productImageRepository, ColorRepository colorRepository, SizeRepository sizeRepository, ProductQuantityRepository productQuantityRepository) {
        this.userRepository = userRepository;
        this.rateRepository = rateRepository;
        this.commentRepository = commentRepository;
        this.productImageRepository = productImageRepository;
        this.colorRepository = colorRepository;
        this.sizeRepository = sizeRepository;
        this.productQuantityRepository = productQuantityRepository;
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
            rate1.setRate(rate);
            rateRepository.save(rate1);
            return rate1;
        }else{
            Rate rate1= new Rate(product,user,rate);
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
}
