package com.example.eb_backend.daoimpl;

import com.alibaba.fastjson.JSONArray;
import com.example.eb_backend.dao.BookDao;
import com.example.eb_backend.entity.Book;
import com.example.eb_backend.repository.BookRepository;
import com.example.eb_backend.utils.RedisUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BookDaoImpl implements BookDao {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    RedisUtil redisUtil;

    @Override
    public Book getBook(int bookId) {
//        return bookRepository.findByBookId(bookId);
        System.out.println("get one book");
        Book book = null;
        Object p = redisUtil.get("book" + bookId);
        if (p == null) {
            System.out.println("\tBook: " + bookId + " is not in Redis");
            book = bookRepository.findByBookId(bookId);
            redisUtil.set("book" + bookId, JSONArray.toJSON(book));
        } else {
            book = JSONArray.parseObject(p.toString(), Book.class);
            System.out.println("\tBook: " + bookId + " is in Redis");
        }
        return book;
    }

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public void setBook(Book book) {
//        bookRepository.save(book);
        System.out.println("set book");
        int id = book.getBookId();
        if (redisUtil.get("book" + id) != null) {
            System.out.println("\tBook: " + id + "is in Redis");
        } else {
            System.out.println("\tBook: " + id + "is not in Redis");
        }
        redisUtil.set("book" + id, JSONArray.toJSON(book));
        bookRepository.save(book);
    }
}
