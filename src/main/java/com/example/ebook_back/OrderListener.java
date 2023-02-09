package com.example.ebook_back;

import com.example.ebook_back.service.OrderService;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import java.util.Objects;

//@Component
//public class OrderListener {
//
//    @Autowired
//    private OrderService orderService;
//    @Autowired
//    private KafkaTemplate<String, String> kafkaTemplate;
//    @Autowired
//    private WebSocketServer ws;
//
//
////    @KafkaListener(topics = "topic1", groupId = "group_topic_test")
////    public void topic1Listener(ConsumerRecord<String, String> record) {
////        String[] value = record.value().split(",");
////        System.out.print("Receive: ");
////        System.out.println(value);
////    }
//
//    @KafkaListener(topics = "orderTopic", groupId = "group_topic_order")
//    public void orderTopicListener(ConsumerRecord<String, String> record) {
//        String[] value = record.value().split(",");
//        Integer userId = new Integer(value[0]);
//        String result = orderService.addOrder(userId);
//        result = result + "," + userId.toString();
//        System.out.println("send res");
//        kafkaTemplate.send("resTopic", result);
//    }
//
//    @KafkaListener(topics = "resTopic", groupId = "group_topic_res")
//    public void resTopicListener(ConsumerRecord<String, String> record) {
//        String[] value = record.value().split(",");
//        System.out.println(" Result: " + value[0]);
//        if (Objects.equals(value[0], "{status:0}")) {
//            ws.sendMessageToUser(value[1], "下订单成功");
//        } else {
//            ws.sendMessageToUser(value[1], "下订单失败");
//        }
//    }
//
//}
