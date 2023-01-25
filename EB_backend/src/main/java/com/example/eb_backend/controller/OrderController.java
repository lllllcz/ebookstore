package com.example.eb_backend.controller;

import com.example.eb_backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping(value = "/setBookToCart")
    public String setBookToCart(@RequestBody Map<String, Integer> params) {
        Integer userId = params.get("userId");
        Integer bookId = params.get("bookId");
        return orderService.setBookToCart(userId, bookId);
    }

    @PostMapping(value = "/setOrder")
    public String setOrder(@RequestBody Map<String, Integer> params) {
        Integer userId = params.get("userId");
        return orderService.setOrder(userId);
    }

    @PostMapping(value = "/setBookToOrder")
    public String setBookToOrder(@RequestBody Map<String, Integer> params) {
        Integer userId = params.get("userId");
        Integer bookId = params.get("bookId");
        Integer bookNum = params.get("bookNum");
        return orderService.setBookToOrder(userId, bookId, bookNum);
    }

    @GetMapping(value = "/getUserCart")
    public String getUserCart(@RequestParam Integer userId) {
        return orderService.getUserCart(userId);
    }

    @GetMapping(value = "/getUserOrders")
    public String getUserOrders(@RequestParam Integer userId) {
        return orderService.getUserOrders(userId);
    }
}
