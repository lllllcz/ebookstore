package com.example.eb_backend.service;

public interface OrderService {
    String setBookToCart(Integer userId, Integer bookId);

    String setOrder(Integer userId);

    String setBookToOrder(Integer userId, Integer bookId, Integer bookNum);

    String getUserCart(Integer userId);

    String getUserOrders(Integer userId);

    String removeBookFromCart(Integer userId, Integer bookId);
}
