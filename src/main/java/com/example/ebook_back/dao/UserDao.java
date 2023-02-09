package com.example.ebook_back.dao;

import com.example.ebook_back.entity.User;
import org.springframework.data.relational.core.sql.In;

import java.util.ArrayList;

public interface UserDao {

    User getUser(String username);
    User getUser(Integer uid);

    ArrayList<User> getAllUsers();

    boolean setUser(User user);

}
