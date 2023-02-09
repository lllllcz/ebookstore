package com.example.ebook_back.repository;

import com.example.ebook_back.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

    User findByUserId(Integer userId);
    User findByUserName(String username);

}
