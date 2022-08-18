package com.example.ebook_back.service;

import com.alibaba.fastjson.JSONObject;
import com.example.ebook_back.entity.Book;
import netscape.javascript.JSObject;

import java.util.ArrayList;
import java.util.Map;

public interface BookService {

    ArrayList<Book> getAllBooks();

    Book getOneBook(Integer id);

    String setBook(Book book);

    String deleteBook(Integer id);

}
