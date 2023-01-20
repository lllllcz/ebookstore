package com.example.eb_backend.repository;

import com.example.eb_backend.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Integer> {

    Book findByBookId(Integer bookId);

}
