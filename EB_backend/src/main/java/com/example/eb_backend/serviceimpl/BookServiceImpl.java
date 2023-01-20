package com.example.eb_backend.serviceimpl;

import com.example.eb_backend.dao.BookDao;
import com.example.eb_backend.entity.Book;
import com.example.eb_backend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookDao bookDao;

    @Override
    public Book getBook(Integer bookId) {
        return bookDao.getBook(bookId);
    }
}
