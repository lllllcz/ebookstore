package com.example.ebook_back.serviceimpl;

import com.alibaba.fastjson.JSONObject;
import com.example.ebook_back.dao.BookDao;
import com.example.ebook_back.dao.OrderDao;
import com.example.ebook_back.dao.UserDao;
import com.example.ebook_back.entity.Book;
import com.example.ebook_back.entity.Order;
import com.example.ebook_back.entity.OrderItem;
import com.example.ebook_back.entity.User;
import com.example.ebook_back.service.StatisticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class StatisticServiceImpl implements StatisticService {

    @Autowired
    private BookDao bookDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private OrderDao orderDao;

    @Override
    public ArrayList<JSONObject> getBookSales(String start, String end) {

        ArrayList<JSONObject> bookSales = new ArrayList<>();

        // 获取所有书籍列表
        ArrayList<Book> books = bookDao.getAllBooks();
        for (Book book : books) {
            JSONObject obj = new JSONObject();
            obj.put("bookName", book.getBookName());
            obj.put("bookId", book.getBookId());
            obj.put("sales", 0);
            bookSales.add(obj);
        }

        // 遍历每一个订单
        ArrayList<Order> orders = orderDao.getAllOrders();
        for (Order order : orders) {
            if (order.getOrderType() == 1) {
                continue;
            }

            // 判断订单时间是否在范围内
            String date = order.getOrderDate().substring(0, 10);
            int flag1 = date.compareTo(start);
            int flag2 = date.compareTo(end);

            if (flag1 > 0 && flag2 <= 0) {

                List<OrderItem> orderItems = order.getOrderItems();

                // 增加销量
                for (OrderItem item : orderItems) {
                    int id = item.getBookId() - 1;
                    JSONObject obj = bookSales.get(id);
                    Integer sales = (Integer) obj.get("sales") + item.getBookNum();
                    obj.put("sales", sales);
                    bookSales.set(id, obj);
                }

            }

        }

        return bookSales;
    }

    @Override
    public ArrayList<JSONObject> getUserSales(String start, String end) {

        ArrayList<JSONObject> userSales = new ArrayList<>();

        // 获取所有用户列表
        ArrayList<User> users = userDao.getAllUsers();
        for (User user : users) {
            JSONObject obj = new JSONObject();
            obj.put("username", user.getUserName());
            obj.put("userId", user.getUserId());
            obj.put("sales", new BigDecimal(0));
            userSales.add(obj);
        }

        // 遍历所有订单
        ArrayList<Order> orders = orderDao.getAllOrders();
        for (Order order : orders) {
            if (order.getOrderType() == 1) {
                continue;
            }

            // 判断订单时间是否在范围内
            String date = order.getOrderDate().substring(0, 10);
            int flag1 = date.compareTo(start);
            int flag2 = date.compareTo(end);

            if (flag1 > 0 && flag2 <= 0) {

                // 增加用户的消费额
                int id = order.getUserId() - 1;
                JSONObject obj = userSales.get(id);
                BigDecimal sale = (BigDecimal) obj.get("sales");
                sale = sale.add(order.getOrderPrice());
                obj.put("sales", sale);
                userSales.set(id, obj);

            }
        }

        return userSales;

    }

    @Override
    public JSONObject getUserStat(String username, String start, String end) {

        JSONObject stat = new JSONObject();

        User user = userDao.getUser(username);
        int uid = user.getUserId();

        ArrayList<Order> orders = orderDao.getAllOrders();

        // 获取所有书籍列表
        ArrayList<JSONObject> bookSales = new ArrayList<>();
        ArrayList<Book> books = bookDao.getAllBooks();
        for (Book book : books) {
            JSONObject obj = new JSONObject();
            obj.put("bookName", book.getBookName());
            obj.put("bookId", book.getBookId());
            obj.put("sales", 0);
            bookSales.add(obj);
        }

        // 计算用户总消费
        BigDecimal price = new BigDecimal(0);
        for (Order order : orders) {
            if (order.getOrderType() == 1 || order.getUserId() != uid) {
                continue;
            }

            // 判断订单时间是否在范围内
            String date = order.getOrderDate().substring(0, 10);
            int flag1 = date.compareTo(start);
            int flag2 = date.compareTo(end);

            if (flag1 > 0 && flag2 <= 0) {

                List<OrderItem> orderItems = order.getOrderItems();

                // 增加销量
                for (OrderItem item : orderItems) {
                    int id = item.getBookId() - 1;
                    JSONObject obj = bookSales.get(id);
                    Integer sales = (Integer) obj.get("sales") + item.getBookNum();
                    obj.put("sales", sales);
                    bookSales.set(id, obj);
                }

                // 增加用户的消费额
                price = price.add(order.getOrderPrice());
            }
        }
        stat.put("price", price);
        stat.put("book", bookSales);


        return stat;
    }


}
