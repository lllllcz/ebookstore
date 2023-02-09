package com.example.ebook_back.repository;

import com.example.ebook_back.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface BookRepository extends JpaRepository<Book, Integer> {
    Book findByBookId(Integer bookId);
}
