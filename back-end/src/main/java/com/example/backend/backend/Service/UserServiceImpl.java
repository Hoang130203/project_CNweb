package com.example.backend.backend.Service;

import com.example.backend.backend.Entity.*;
import com.example.backend.backend.Payload.Cart.PostCart;
import com.example.backend.backend.Repository.ColorRepository;
import com.example.backend.backend.Repository.ProductRepository;
import com.example.backend.backend.Repository.SizeRepository;
import com.example.backend.backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final ColorRepository colorRepository;
    private final SizeRepository sizeRepository;
    @Autowired
    public UserServiceImpl(UserRepository userRepository, ProductRepository productRepository, ColorRepository colorRepository, SizeRepository sizeRepository) {
        this.userRepository = userRepository;
        this.productRepository = productRepository;
        this.colorRepository = colorRepository;
        this.sizeRepository = sizeRepository;
    }
    @Override
    public Optional<User> getByAccount(String account) {
        return userRepository.findByAccount(account);
    }

    @Override
    public Optional<User> getById(String id) {
        return userRepository.findById(id);
    }

    @Override
    public boolean existByAccount(String account) {
        return userRepository.existsByAccount(account);
    }

    @Override
    @Transactional
    public void save(User user) {
        userRepository.save(user);
    }

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
}
