package com.example.name_search.repository;

import com.example.name_search.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface BookRepository extends JpaRepository<Book, Integer> {
    Book findByBookName(String bookName);
}
