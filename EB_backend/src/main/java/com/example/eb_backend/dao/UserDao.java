package com.example.eb_backend.dao;

import com.example.eb_backend.entity.User;

public interface UserDao {
    User getUser(String username);
}
