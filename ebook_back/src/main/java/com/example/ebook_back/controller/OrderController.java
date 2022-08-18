package com.example.ebook_back.controller;

import com.alibaba.fastjson.JSON;
import com.example.ebook_back.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrderController {
    @Autowired
    private OrderService orderService;

    @RequestMapping("/getOrders")
    public String getUserOrders(@RequestParam("userId") Integer id) {
        return JSON.toJSONString(orderService.getUserOrders(id));
    }

    @RequestMapping("/getCartBooks")
    public String getCart(@RequestParam("userId") Integer id) {
        return JSON.toJSONString(orderService.getCart(id));
    }

    @RequestMapping("/addBookToCart")
    public String addBookToCart(@RequestParam("userId") Integer userId, @RequestParam("bookId") Integer bookId) {
        System.out.println("add book to cart " + bookId);
        return orderService.addBookToCart(userId, bookId);
    }

    @RequestMapping("/addOrder")
    public String addOrder(@RequestParam("userId") Integer userId, @RequestParam("price") String priceStr) {
        System.out.println("add order " + userId);
        return orderService.addOrder(userId);
    }

    @RequestMapping("/getAllOrders")
    public String getAllOrders() {
        return JSON.toJSONString(orderService.getAllOrders());
    }
}
