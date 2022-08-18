package com.example.ebook_back.daoimpl;

import com.example.ebook_back.dao.UserDao;
import com.example.ebook_back.entity.User;
import com.example.ebook_back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Objects;

@Repository
public class UserDaoImpl implements UserDao {

    @Autowired
    UserRepository userRepository;

    @Override
    public User getUser(String username) {
        return userRepository.findByUserName(username);
    }

    @Override
    public User getUser(Integer uid) { return userRepository.findByUserId(uid); }

    @Override
    public ArrayList<User> getAllUsers() {
        return (ArrayList<User>) userRepository.findAll();
    }

    @Override
    public boolean setUser(User user) {
        userRepository.save(user);
        return true;
    }
}
