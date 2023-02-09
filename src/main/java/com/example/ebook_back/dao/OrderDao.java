package com.example.ebook_back.dao;

import com.example.ebook_back.entity.Order;
import com.example.ebook_back.entity.OrderItem;

import java.util.ArrayList;

public interface OrderDao {

    ArrayList<Order> getUserOrders(Integer userId);

    Order getCart(Integer userId);

    Order getSuOrder();

    void setOrder(Order order);

    ArrayList<Order> getAllOrders();

}
