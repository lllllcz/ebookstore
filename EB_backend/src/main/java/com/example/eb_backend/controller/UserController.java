package com.example.eb_backend.controller;

import com.example.eb_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping(value = "/signup")
    public String signup(@RequestBody Map<String, String> params) {
        String username = params.get("username");
        String password = params.get("password");
        return userService.signup(username, password);
    }

    @PostMapping(value = "/login")
    public String login(@RequestBody Map<String, String> params){
        String username = params.get("username");
        String password = params.get("password");
        return userService.login(username, password);
    }

    @GetMapping("/checkSession")
    public String checkSession(){
        return userService.checkSession();
    }

    @GetMapping("/logout")
    public String logout(){
        return userService.logout();
    }

}
