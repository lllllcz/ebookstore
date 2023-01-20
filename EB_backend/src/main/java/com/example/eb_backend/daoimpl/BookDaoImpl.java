package com.example.eb_backend.daoimpl;

import com.example.eb_backend.dao.BookDao;
import com.example.eb_backend.entity.Book;
import com.example.eb_backend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class BookDaoImpl implements BookDao {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public Book getBook(int bookId) {
        return bookRepository.findByBookId(bookId);
    }
}
