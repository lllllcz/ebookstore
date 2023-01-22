package com.example.eb_backend.service;

import com.example.eb_backend.entity.Book;

import java.util.List;

public interface BookService {

    Book getBook(Integer bookId);

    List<Book> getAllBooks();

}
