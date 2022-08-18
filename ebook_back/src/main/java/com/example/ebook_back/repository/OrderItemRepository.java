package com.example.ebook_back.repository;

import com.example.ebook_back.entity.Order;
import com.example.ebook_back.entity.OrderItem;
import com.example.ebook_back.entity.OrderItemPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, OrderItemPK> {
}
