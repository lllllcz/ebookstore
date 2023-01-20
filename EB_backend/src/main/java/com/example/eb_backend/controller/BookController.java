package com.example.eb_backend.controller;

import com.alibaba.fastjson.JSON;
import com.example.eb_backend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping(value = "/getBook")
    public String getBook(@RequestParam("bookId") Integer bookId) {
        return JSON.toJSONString(bookService.getBook(bookId));
    }

}