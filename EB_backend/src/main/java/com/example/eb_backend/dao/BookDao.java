package com.example.eb_backend.dao;

import com.example.eb_backend.entity.Book;

import java.util.List;

public interface BookDao {

    Book getBook(int bookId);

    List<Book> getAllBooks();

    void setBook(Book book);
}
