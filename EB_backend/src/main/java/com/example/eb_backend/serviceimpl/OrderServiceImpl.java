package com.example.eb_backend.serviceimpl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.example.eb_backend.dao.BookDao;
import com.example.eb_backend.dao.OrderDao;
import com.example.eb_backend.entity.Book;
import com.example.eb_backend.entity.CartItem;
import com.example.eb_backend.entity.Order;
import com.example.eb_backend.entity.OrderItem;
import com.example.eb_backend.service.OrderService;
import com.example.eb_backend.utils.MessageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderDao orderDao;

    @Autowired
    private BookDao bookDao;

    /*
     * 将一本书添加到购物车中
     */
    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public String setBookToCart(Integer userId, Integer bookId) {
        CartItem cartItem = orderDao.getUserCartBook(userId, bookId);
        int num = 1;
        if (cartItem != null) {
            num = cartItem.getBookNum() + 1;
        }
        CartItem newItem = new CartItem();
        newItem.setBookId(bookId);
        newItem.setUserId(userId);
        newItem.setBookNum(num);
        orderDao.setCartItem(newItem);
        return MessageUtil.message(1, "添加购物车成功", null);
    }

    /*
     * 将购物车中的所有商品转为订单
     */
    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public String setOrder(Integer userId) {

        Order order = new Order();
        order.setUserId(userId);

        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dateString = formatter.format(date);
        order.setOrderDate(dateString);

        List<CartItem> cartItemList = orderDao.getUserCart(userId);
        List<OrderItem> orderItemList = new ArrayList<>();
        BigDecimal sum = BigDecimal.valueOf(0);
        for (CartItem cartItem : cartItemList) {
            int num = cartItem.getBookNum();

            if (num == 0) continue;

            Book book = cartItem.getBook();
            int inv = book.getInventory() - num; // TODO 没有检查库存是否足够
            book.setInventory(inv);
            bookDao.setBook(book);

            int bid = cartItem.getBookId();
            BigDecimal bookPrice = cartItem.getBook().getBookPrice();
            sum = sum.add(bookPrice.multiply(BigDecimal.valueOf(num)));

            OrderItem orderItem = new OrderItem();
            orderItem.setBookId(bid);
            orderItem.setBookNum(num);
            orderItemList.add(orderItem);
        }
        order.setOrderPrice(sum);

        orderDao.setOrder(order);

        int oid = order.getOrderId();
        for (OrderItem item : orderItemList) {
            item.setOrderId(oid);
            orderDao.setOrderItem(item);
        }

        for (CartItem item : cartItemList) {
            item.setBookNum(0);
            orderDao.setCartItem(item);
        }

        return MessageUtil.message(1, "下单成功", null);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public String setBookToOrder(Integer userId, Integer bookId, Integer bookNum) {
        Order order = new Order();
        order.setUserId(userId);

        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dateString = formatter.format(date);
        order.setOrderDate(dateString);

        Book book = bookDao.getBook(bookId);

        int inv = book.getInventory() - bookNum; // TODO 检查库存
        book.setInventory(inv);
        bookDao.setBook(book);

        BigDecimal price = book.getBookPrice();
        BigDecimal sum = price.multiply(BigDecimal.valueOf(bookNum));
        order.setOrderPrice(sum);

        orderDao.setOrder(order);

        OrderItem orderItem = new OrderItem();
        orderItem.setBookId(bookId);
        orderItem.setBookNum(bookNum);
        orderItem.setOrderId(order.getOrderId());
        orderDao.setOrderItem(orderItem);

        String msg = "下单《" + book.getBookName() + "》成功";
        return MessageUtil.message(1, msg, null);
    }

    @Override
    public String getUserCart(Integer userId) {
        List<CartItem> cartItemList = orderDao.getUserCart(userId);
        return MessageUtil.message(1, "cart", cartItemList);
    }

    @Override
    public String getUserOrders(Integer userId) {
        List<Order> orderList = orderDao.getUserOrders(userId);
        return MessageUtil.message(1, "orders", JSON.toJSONString(orderList, SerializerFeature.DisableCircularReferenceDetect));
    }

}
