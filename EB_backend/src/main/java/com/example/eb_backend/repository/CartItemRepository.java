package com.example.eb_backend.repository;

import com.example.eb_backend.entity.CartItem;
import com.example.eb_backend.entity.CartItemPK;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, CartItemPK> {
    List<CartItem> findAllByUserId(Integer userId);
    CartItem findByUserIdAndBookId(Integer userId, Integer bookId);
}
