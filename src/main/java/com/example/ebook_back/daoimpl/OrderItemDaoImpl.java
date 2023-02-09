package com.example.ebook_back.daoimpl;

import com.example.ebook_back.dao.OrderItemDao;
import com.example.ebook_back.entity.OrderItem;
import com.example.ebook_back.repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class OrderItemDaoImpl implements OrderItemDao {

    @Autowired
    OrderItemRepository orderItemRepository;

    @Override
    @Transactional(propagation = Propagation.MANDATORY)
    public void setOrderItem(OrderItem orderItem) {
        orderItemRepository.save(orderItem);
    }

    @Override
    public void delete(OrderItem orderItem) {
        orderItemRepository.delete(orderItem);
    }

}
