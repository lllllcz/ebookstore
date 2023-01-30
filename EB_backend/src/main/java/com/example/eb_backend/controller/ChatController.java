package com.example.eb_backend.controller;

import com.example.eb_backend.WebSocketServer;
import com.example.eb_backend.utils.MessageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
@Scope("session")
public class ChatController {

    @Autowired
    private WebSocketServer ws;

    @GetMapping(value = "/hello")
    public String hello(@RequestParam("userId") String userId) {
        String msg = "Hello! This is a message send by WebSocket.";
        if (Objects.equals(userId, "00")) msg = "Oops! Please login first.";
        ws.sendMessageToUser(userId, msg);
        return MessageUtil.message(0, "receive ws request", null);
    }

}
