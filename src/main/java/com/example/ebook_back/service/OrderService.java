package com.example.ebook_back.service;

import com.example.ebook_back.entity.Order;

import java.util.ArrayList;

public interface OrderService {
    ArrayList<Order> getUserOrders(Integer id);

    String addOrder(Integer uid);

    ArrayList<Order> getAllOrders();

    Order getCart(Integer id);

    String addBookToCart(Integer uid, Integer bookId);

    String buyOneBook(Integer uid, Integer bookId);

}
