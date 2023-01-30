package com.example.eb_backend.controller;

import com.alibaba.fastjson.JSON;
import com.example.eb_backend.service.BookService;
import com.example.eb_backend.service.SearchService;
import org.apache.solr.client.solrj.SolrServerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class BookController {

    @Autowired
    private BookService bookService;

    @Autowired
    private SearchService searchService;

    @GetMapping(value = "/getBook")
    public String getBook(@RequestParam("bookId") Integer bookId) {
        return JSON.toJSONString(bookService.getBook(bookId));
    }

    @GetMapping(value = "/getAllBooks")
    public String getAllBooks() {
        return JSON.toJSONString(bookService.getAllBooks());
    }

//    @GetMapping("/search/addAll")
//    public String add() throws SolrServerException, IOException {
//        return searchService.addAll();
//    }

    @GetMapping("/search/BookName")
    public String searchBookName(@RequestParam("keyword") String keyword) throws SolrServerException, IOException {
        return searchService.searchBookName(keyword);
    }
}
