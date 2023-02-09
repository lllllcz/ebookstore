package com.example.ebook_back.dao;

import com.example.ebook_back.entity.OrderItem;

public interface OrderItemDao {

    void setOrderItem(OrderItem orderItem);

    void delete(OrderItem orderItem);

}
