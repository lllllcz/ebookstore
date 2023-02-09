package com.example.ebook_back.service;

import com.alibaba.fastjson.JSONObject;
import com.example.ebook_back.entity.User;
import org.springframework.data.relational.core.sql.In;

import java.util.ArrayList;

public interface UserService {

    JSONObject signup(String username, String password);

    JSONObject login(String username, String password);

    JSONObject logout();

    JSONObject checkSession();


    ArrayList<User> getAllUsers();

    String disableUser(Integer uid);

    String enableUser(Integer uid);

}
