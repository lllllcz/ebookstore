package com.example.ebook_back.serviceimpl;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson2.JSON;
import com.example.ebook_back.dao.BookDao;
import com.example.ebook_back.dao.OrderDao;
import com.example.ebook_back.entity.Book;
import com.example.ebook_back.entity.Order;
import com.example.ebook_back.entity.OrderItem;
import com.example.ebook_back.service.BookService;
import netscape.javascript.JSObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookDao bookDao;

    @Override
    public ArrayList<Book> getAllBooks() {
        return bookDao.getAllBooks();
    }

    @Override
    public Book getOneBook(Integer id) {
        return bookDao.getOneBook(id);
    }

    @Override
    public String setBook(Book book) {
        bookDao.setBook(book);
        return "{status:1}";
    }

    @Override
    public String deleteBook(Integer id) {
        bookDao.deleteBook(id);
        return "{status:1}";
    }

}
