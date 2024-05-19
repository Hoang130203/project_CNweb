package com.example.backend.backend.Service;



import com.example.backend.backend.Entity.Cart;
import com.example.backend.backend.Entity.Enum_Key.EStatus;
import com.example.backend.backend.Entity.Order;
import com.example.backend.backend.Entity.User;
import com.example.backend.backend.Payload.Cart.PostCart;
import com.example.backend.backend.Payload.Order.OrderInfo;

import java.util.List;
import java.util.Optional;

public interface UserService {
    Optional<User> getByAccount(String account);
    Optional<User> getById(String id);
    boolean existByAccount(String account);
    void save(User user);
    void addProductToCart(PostCart postCart, String userId);
    List<Cart> getCart(String userId);
    boolean delete(PostCart postCart,String userId);
    List<User> getAllByEmail(String email);
    String postOrder(OrderInfo orderInfo, String userId);
    Order getOrder(String userId, int orderId);
    Order putOrder(int orderId, EStatus status);
    List<Order> getOrders(String userId);
    boolean cancelOrder(String userId,int orderId);
    void createTransaction(User user, Long amount,int orderId);
    boolean completeTransaction(User user, Long amount,int orderId);


}
