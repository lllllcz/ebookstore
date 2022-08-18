package com.example.ebook_back.daoimpl;

import com.example.ebook_back.dao.BookDao;
import com.example.ebook_back.entity.Book;
import com.example.ebook_back.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.sql.In;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Map;

@Repository
public class BookDaoImpl implements BookDao {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public ArrayList<Book> getAllBooks() {
        return (ArrayList<Book>) bookRepository.findAll();
    }

    @Override
    public Book getOneBook(Integer id) {
        return bookRepository.findByBookId(id);
    }

    @Override
    public boolean setBook(Book book) {
        bookRepository.save(book);
        return true;
    }

    @Override
    public boolean deleteBook(Integer id) {
        bookRepository.deleteById(id);
        return true;
    }

}
