package com.example.ebook_back.controller;

import com.alibaba.fastjson.JSON;
import com.example.ebook_back.entity.Book;
import com.example.ebook_back.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.Map;

@RestController
public class BookController {

    @Autowired
    private BookService bookService;

    @RequestMapping(value = "/getBooks", produces = "application/json; charset=utf-8")
    public String getBooks(@RequestBody Map<String, String> params) {
        System.out.println("Get all books! ^_^");
        return JSON.toJSONString(bookService.getAllBooks());
    }

    @RequestMapping(value = "/getBook", produces = "application/json; charset=utf-8")
    public String getBook(@RequestParam("id") Integer id) {
        System.out.println("Get one book: " + id);
        return JSON.toJSONString(bookService.getOneBook(id));
    }

    @RequestMapping("/setBook")
    public String setBook(
            @RequestParam("id") Integer bookId,
            @RequestParam("author") String author,
            @RequestParam("bookName") String name,
            @RequestParam("bookPrice") BigDecimal price,
            @RequestParam("inventory") Integer inv,
            @RequestParam("isbn") String isbn,
            @RequestParam("des") String des
    ) {
        Book book = bookService.getOneBook(bookId);
        book.setAuthor(author);
        book.setBookName(name);
        book.setBookPrice(price);
        book.setInventory(inv);
        book.setIsbn(isbn);
        book.setBookDescription(des);

        return bookService.setBook(book);
    }

    @RequestMapping("/deleteBook")
    public String deleteBook(@RequestParam("id") Integer id) {
        return bookService.deleteBook(id);
    }

    @RequestMapping("/addBookToDB")
    public String addBook(
            @RequestParam("author") String author,
            @RequestParam("bookName") String name,
            @RequestParam("bookPrice") BigDecimal price,
            @RequestParam("inventory") Integer inv,
            @RequestParam("isbn") String isbn,
            @RequestParam("des") String des
    ) {
        Book book = new Book();
        book.setAuthor(author);
        book.setBookName(name);
        book.setBookPrice(price);
        book.setInventory(inv);
        book.setIsbn(isbn);
        book.setBookDescription(des);

        return bookService.setBook(book);
    }

}
