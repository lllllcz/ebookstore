package com.example.ebook_back.daoimpl;

import com.example.ebook_back.dao.OrderDao;
import com.example.ebook_back.entity.Order;
import com.example.ebook_back.entity.OrderItem;
import com.example.ebook_back.repository.OrderItemRepository;
import com.example.ebook_back.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Collections;

@Repository
public class OrderDaoImpl implements OrderDao {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Override
    public ArrayList<Order> getUserOrders(Integer userId) {
        return (ArrayList<Order>) orderRepository.findAllByUserIdAndOrderType(userId, 0);
    }

    @Override
    public Order getCart(Integer userId) {
        return orderRepository.findAllByUserIdAndOrderType(userId, 1).get(0);
    }

    @Override
    public boolean setOrder(Order order) {
        orderRepository.save(order);

        return true;
    }

    @Override
    public boolean setOrderItem(OrderItem item) {
        orderItemRepository.save(item);

        return true;
    }

    public ArrayList<Order> getAllOrders() {
        return (ArrayList<Order>) orderRepository.findByOrderType(0);
    }

}
