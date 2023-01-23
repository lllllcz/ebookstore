package com.example.eb_backend.service;

public interface UserService {
    String login(String username, String password);

    String checkSession();

    String logout();
}
