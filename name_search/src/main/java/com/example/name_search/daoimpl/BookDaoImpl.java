package com.example.name_search.daoimpl;

import com.example.name_search.dao.BookDao;
import com.example.name_search.entity.Book;
import com.example.name_search.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class BookDaoImpl implements BookDao {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public Book getBook(String bookName) {
        return bookRepository.findByBookName(bookName);
    }

}
