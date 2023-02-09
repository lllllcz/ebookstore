package com.example.name_search.controller;

import com.example.name_search.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/search")
public class BookController {

    @Autowired
    private BookService bookService;

    @RequestMapping("/bookNameToAuthor")
    public String deleteBook(@RequestParam("name") String name) {
        return bookService.getBook(name).getAuthor();
    }

    @GetMapping(value = "/msg")
    public String msg() {
        System.out.println("msg");
        return "Hello World! This is a search page.";
    }

}
