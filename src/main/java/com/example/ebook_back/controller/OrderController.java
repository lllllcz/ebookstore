package com.example.ebook_back.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.example.ebook_back.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/book")
public class OrderController {
    @Autowired
    private OrderService orderService;

//    @Autowired
//    private KafkaTemplate<String, String> kafkaTemplate;

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
        return orderService.addBookToCart(userId, bookId);
    }

    @RequestMapping("/buyOneBook")
    public String buyOneBook(@RequestParam("userId") Integer userId, @RequestParam("bookId") Integer bookId) {
        return orderService.buyOneBook(userId, bookId);
    }

    @RequestMapping("/addOrder")
    public String addOrder(@RequestParam("userId") Integer userId, @RequestParam("price") String priceStr) {
        System.out.println("send order");
        String data = userId.toString() + "," + priceStr;
//        kafkaTemplate.send("orderTopic", data);
        JSONObject object = new JSONObject();
        object.put("status", "handling...");
        return object.toJSONString();
    }

    @RequestMapping("/getAllOrders")
    public String getAllOrders() {
        return JSON.toJSONString(orderService.getAllOrders());
    }

    @RequestMapping("/orderStatus")
    public String getOrderStatus() {
        System.out.println("done");
        JSONObject object = new JSONObject();
        object.put("status", "done");
        return object.toJSONString();
    }


//    @RequestMapping("/send")
//    public void send() {
//        String data = "Tom,Jerry,80";
//        kafkaTemplate.send("topic1",  "key", data);
//        System.out.println(data);
//    }

}
