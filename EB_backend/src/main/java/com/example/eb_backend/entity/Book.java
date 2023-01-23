package com.example.eb_backend.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Objects;

@Entity
@Table(name = "books")
public class Book {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "book_id")
    private int bookId;

    @Basic
    @Column(name = "isbn")
    private String isbn;

    @Basic
    @Column(name = "book_name")
    private String bookName;

    @Basic
    @Column(name = "author")
    private String author;

    @Basic
    @Column(name = "book_price")
    private BigDecimal bookPrice;

    @Basic
    @Column(name = "book_description")
    private String bookDescription;

    @Basic
    @Column(name = "inventory")
    private Integer inventory;

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public BigDecimal getBookPrice() {
        return bookPrice;
    }

    public void setBookPrice(BigDecimal bookPrice) {
        this.bookPrice = bookPrice;
    }

    public String getBookDescription() {
        return bookDescription;
    }

    public void setBookDescription(String bookDescription) {
        this.bookDescription = bookDescription;
    }

    public Integer getInventory() {
        return inventory;
    }

    public void setInventory(Integer inventory) {
        this.inventory = inventory;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Book book = (Book) o;
        return bookId == book.bookId && Objects.equals(isbn, book.isbn) && Objects.equals(bookName, book.bookName) && Objects.equals(author, book.author) && Objects.equals(bookPrice, book.bookPrice) && Objects.equals(bookDescription, book.bookDescription) && Objects.equals(inventory, book.inventory);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bookId, isbn, bookName, author, bookPrice, bookDescription, inventory);
    }
}
