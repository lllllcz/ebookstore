package com.example.eb_backend.daoimpl;

import com.example.eb_backend.dao.OrderDao;
import com.example.eb_backend.entity.CartItem;
import com.example.eb_backend.entity.Order;
import com.example.eb_backend.entity.OrderItem;
import com.example.eb_backend.repository.CartItemRepository;
import com.example.eb_backend.repository.OrderItemRepository;
import com.example.eb_backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class OrderDaoImpl implements OrderDao {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Override
    public List<CartItem> getUserCart(Integer userId) {
        List<CartItem> cartItemList = cartItemRepository.findAllByUserId(userId);
        List<CartItem> newList = new ArrayList<>();
        for (CartItem item : cartItemList) {
            if (item.getBookNum() != 0) {
                newList.add(item);
            }
        }
        return newList;
    }

    @Override
    public CartItem getUserCartBook(Integer userId, Integer bookId) {
        return cartItemRepository.findByUserIdAndBookId(userId, bookId);
    }

    @Override
    public void setOrder(Order order) {
        orderRepository.save(order);
    }

    @Override
    public void setOrderItem(OrderItem item) {
        orderItemRepository.save(item);
    }

    @Override
    public void setCartItem(CartItem item) {
        cartItemRepository.save(item);
    }

    @Override
    public List<Order> getUserOrders(Integer userId) {
        return orderRepository.findAllByUserId(userId);
    }
}
