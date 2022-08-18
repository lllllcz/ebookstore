package com.example.ebook_back.dao;

import com.example.ebook_back.entity.Book;

import java.util.ArrayList;
import java.util.Map;

public interface BookDao {

    ArrayList<Book> getAllBooks();

    Book getOneBook(Integer id);

    boolean setBook(Book book);

    boolean deleteBook(Integer id);

}
