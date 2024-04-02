package com.example.backend.backend.Service;

import com.example.backend.backend.Entity.Comment;
import com.example.backend.backend.Entity.Enum_Key.EType;
import com.example.backend.backend.Entity.Enum_Key.RateKey;
import com.example.backend.backend.Entity.Product;
import com.example.backend.backend.Entity.Rate;
import com.example.backend.backend.Entity.User;
import com.example.backend.backend.Payload.Product.CommentReq;
import com.example.backend.backend.Repository.CommentRepository;
import com.example.backend.backend.Repository.ProductRepository;
import com.example.backend.backend.Repository.RateRepository;
import com.example.backend.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;
    private final UserRepository userRepository;
    private final RateRepository rateRepository;
    private final CommentRepository commentRepository;
    public ProductServiceImpl(UserRepository userRepository, RateRepository rateRepository, CommentRepository commentRepository) {
        this.userRepository = userRepository;
        this.rateRepository = rateRepository;
        this.commentRepository = commentRepository;
    }

    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> getNewest() {
        Pageable pageable = PageRequest.of(0, 12);
        return productRepository.findTop12Product(pageable);
    }

    @Override
    public List<Product> getProductByType(EType type) {
        return productRepository.findProductByType(type);
    }

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

    @Override
    public Rate getRate(int productId, String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Product product= productRepository.findById(productId)
                .orElseThrow(()->new RuntimeException("Product not found"));
        Optional<Rate> rate = rateRepository.findById(new RateKey(product,user));

        return rate.isPresent()?rate.get():null;
    }

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

    @Override
    public List<Comment> getComments(String userId, int productId) {
        User user= userRepository.findById(userId)
                .orElseThrow(()->new RuntimeException("User not found"));
        Product product= productRepository.findById(productId)
                .orElseThrow(()->new RuntimeException("Product not found"));
        List<Comment> comments= commentRepository.findCommentsByUserAndProduct(user,product);
        return comments;
    }
}
