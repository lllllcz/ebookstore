package com.example.ebook_back.daoimpl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.example.ebook_back.dao.BookDao;
import com.example.ebook_back.entity.Book;
import com.example.ebook_back.entity.BookIcon;
import com.example.ebook_back.repository.BookIconRepository;
import com.example.ebook_back.repository.BookRepository;
import com.example.ebook_back.utils.RedisUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.sql.In;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public class BookDaoImpl implements BookDao {

    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private BookIconRepository bookIconRepository;

    @Autowired
    RedisUtil redisUtil;

    @Override
    public ArrayList<Book> getAllBooks() {
        System.out.println("get all books");
        List<Book> books = null;
        Object p = redisUtil.get("bookAll");
        if (p == null) {
            System.out.println("\tBook: all-list is not in Redis");
            books = bookRepository.findAll();
            redisUtil.set("bookAll", JSONArray.toJSON(books));
        } else {
            System.out.println("\tBook: all-list is in Redis");
            books = JSON.parseArray(p.toString(), Book.class);

        }

        for (Book book : books) {
            Optional<BookIcon> icon = bookIconRepository.findById(book.getBookId());
            if (icon.isPresent()){
                book.setIcon(icon.get());
            }
            else{
                book.setIcon(null);
            }
        }

        return (ArrayList<Book>)books;
//        return (ArrayList<Book>) bookRepository.findAll();
    }

    @Override
    public Book getOneBook(Integer id) {
        System.out.println("get one book");
        Book book = null;
        Object p = redisUtil.get("book" + id);
        if (p == null) {
            System.out.println("\tBook: " + id + " is not in Redis");
            book = bookRepository.findByBookId(id);
            redisUtil.set("book" + id, JSONArray.toJSON(book));
        } else {
            book = JSONArray.parseObject(p.toString(), Book.class);
            System.out.println("\tBook: " + id + " is in Redis");
        }

        Optional<BookIcon> icon = bookIconRepository.findById(id);
        if (icon.isPresent()){
            System.out.println("Not Null " + id);
            book.setIcon(icon.get());
        }
        else{
            book.setIcon(null);
            System.out.println("It's Null");
        }

        return book;
    }

    @Override
    public boolean setBook(Book book) {
        System.out.println("set book");
        if (redisUtil.get("book" + book.getBookId()) != null) {
            System.out.println("\tBook: " + book.getBookId() + "is in Redis");
        } else {
            System.out.println("\tBook: " + book.getBookId() + "is not in Redis");
        }
        redisUtil.set("book" + book.getBookId(), JSONArray.toJSON(book));
        bookRepository.save(book);
        return true;
    }

    @Override
    public boolean deleteBook(Integer id) {
        System.out.println("delete book");
        if (redisUtil.get("book" + id) != null) {
            System.out.println("\tBook: " + id + "is in Redis");
            redisUtil.del("book" + id);
        } else {
            System.out.println("\tBook: " + id + "is not in Redis");
        }
        bookRepository.deleteById(id);
        return true;
    }

}
