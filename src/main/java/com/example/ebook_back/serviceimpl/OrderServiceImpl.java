package com.example.ebook_back.serviceimpl;

import com.example.ebook_back.dao.BookDao;
import com.example.ebook_back.dao.OrderDao;
import com.example.ebook_back.dao.OrderItemDao;
import com.example.ebook_back.entity.Book;
import com.example.ebook_back.entity.Order;
import com.example.ebook_back.entity.OrderItem;
import com.example.ebook_back.service.OrderService;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderDao orderDao;

    @Autowired
    private BookDao bookDao;

    @Autowired
    private OrderItemDao orderItemDao;

    @Override
    public ArrayList<Order> getUserOrders(Integer id) {
        return orderDao.getUserOrders(id);
    }

    @Override
    public ArrayList<Order> getAllOrders() {
        return orderDao.getAllOrders();
    }

    @Override
    public Order getCart(Integer id) {
        return orderDao.getCart(id);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public String addBookToCart(Integer uid, Integer bookId) {
        Order cart = orderDao.getCart(uid);
        int orderId = cart.getOrderId();

        OrderItem item = new OrderItem();
        item.setBookId(bookId);
        item.setOrderId(orderId);
        item.setBookNum(1);

        // 判断是否有库存
        Book book = bookDao.getOneBook(bookId);
        if (book.getInventory() == 0) {
            return "{status:-1}";
        }

        // 将书添加到购物车中
        List<OrderItem> items = cart.getOrderItems();
        items.add(item);
        cart.setOrderItems(items);

        // 修改购物车中的总价
        BigDecimal price;
        if (items.size() == 1) {
            price = book.getBookPrice();
        }
        else {
            price = cart.getOrderPrice().add(book.getBookPrice());
        }
        cart.setOrderPrice(price);

        orderItemDao.setOrderItem(item);

        orderDao.setOrder(cart);

        return "{status:1}";

    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public String buyOneBook(Integer uid, Integer bookId) {

        // 确定下订单时间
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dateString = formatter.format(date).toString();

        // 书
        // TODO 如下
        Book book = bookDao.getOneBook(bookId);
        Integer inv = book.getInventory() - 1;
        book.setInventory(inv);
        BigDecimal price = book.getBookPrice();
        bookDao.setBook(book);

        // 添加新订单
        Order order = new Order();
        order.setUserId(uid);
        order.setOrderDate(dateString);
        order.setOrderType(0);
        order.setOrderPrice(price);
        orderDao.setOrder(order);

        // 添加新 OrderItem
        int orderId = order.getOrderId();
        OrderItem orderItem = new OrderItem();
        orderItem.setBookNum(1);
        orderItem.setBookId(bookId);
        orderItem.setOrderId(orderId);
        try {
            orderItemDao.setOrderItem(orderItem);
        } catch (ArithmeticException e) {

        }

        return "{status:1}";
    }

    @Override
    @Transactional(propagation=Propagation.REQUIRED)
    public String addOrder(Integer uid) {
        // 确定下订单时间
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dateString = formatter.format(date).toString();

        Order cart = orderDao.getCart(uid);
        List<OrderItem> items = cart.getOrderItems();

        // 修改数据库中书籍的库存
        // TODO 这里只能处理此时该书有库存的情况
        for (OrderItem item : items) {
            Book book = bookDao.getOneBook(item.getBookId());
            Integer inv = book.getInventory() - 1;
            book.setInventory(inv);
            bookDao.setBook(book);
        }

        // 将购物车转为订单，存入数据库
        cart.setOrderType(0);
        cart.setOrderDate(dateString);
        orderDao.setOrder(cart);

        // 为用户新建空购物车
        Order newCart = new Order();
        newCart.setOrderType(1);
        newCart.setUserId(uid);
        orderDao.setOrder(newCart);

        return "{status:1}";
    }

}
