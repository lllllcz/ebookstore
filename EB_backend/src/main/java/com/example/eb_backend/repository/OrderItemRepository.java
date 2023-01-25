package com.example.eb_backend.repository;

import com.example.eb_backend.entity.OrderItem;
import com.example.eb_backend.entity.OrderItemPK;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, OrderItemPK> {
}
