package com.example.eb_backend.daoimpl;

import com.example.eb_backend.dao.UserDao;
import com.example.eb_backend.entity.User;
import com.example.eb_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserDaoImpl implements UserDao {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User getUser(String username) {
        return userRepository.findByUserName(username);
    }

    @Override
    public void setUser(User user) {
        userRepository.save(user);
    }
}
