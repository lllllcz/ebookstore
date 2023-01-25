package com.example.eb_backend.dao;

import com.example.eb_backend.entity.CartItem;
import com.example.eb_backend.entity.Order;
import com.example.eb_backend.entity.OrderItem;

import java.util.List;

public interface OrderDao {

    List<CartItem> getUserCart(Integer userId);

    CartItem getUserCartBook(Integer userId, Integer bookId);

    void setOrder(Order order);

    void setOrderItem(OrderItem item);

    void setCartItem(CartItem item);

    List<Order> getUserOrders(Integer userId);
}
