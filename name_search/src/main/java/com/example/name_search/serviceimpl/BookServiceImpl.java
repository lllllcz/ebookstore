package com.example.name_search.serviceimpl;

import com.example.name_search.dao.BookDao;
import com.example.name_search.entity.Book;
import com.example.name_search.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookDao bookDao;

    @Override
    public Book getBook(String bookName) {
        return bookDao.getBook(bookName);
    }

}
