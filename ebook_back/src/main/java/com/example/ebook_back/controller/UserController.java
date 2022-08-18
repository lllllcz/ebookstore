package com.example.ebook_back.controller;


import com.alibaba.fastjson.JSONObject;
import com.example.ebook_back.entity.User;
import com.example.ebook_back.service.UserService;
import com.example.ebook_back.utils.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Objects;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/login")
    public JSONObject login(@RequestBody Map<String, String> params){
        String username = params.get("username");
        String password = params.get("password");

        return userService.login(username, password);
    }

    @RequestMapping("/logout")
    public JSONObject logout(){
        return userService.logout();
    }

    @RequestMapping("/checkSession")
    public JSONObject checkSession(){
        return userService.checkSession();
    }

    @RequestMapping("/getAllUsers")
    public String getAllUsers() {
        return JSONObject.toJSONString(userService.getAllUsers());
    }

    @RequestMapping("/disableUser")
    public String disableUser(@RequestParam("id") Integer uid) { return userService.disableUser(uid); }

    @RequestMapping("/enableUser")
    public String enableUser(@RequestParam("id") Integer uid) { return userService.enableUser(uid); }

    @RequestMapping("/signup")
    public JSONObject signup(@RequestBody Map<String, String> params){
        String username = params.get("username");
        String password = params.get("password");

        return userService.signup(username, password);
    }

}
