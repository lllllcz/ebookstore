package com.example.ebook_back.repository;

import com.example.ebook_back.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findAllByUserIdAndOrderType(Integer userId, Integer OrderType);

    List<Order> findByOrderType(Integer orderType);
}
