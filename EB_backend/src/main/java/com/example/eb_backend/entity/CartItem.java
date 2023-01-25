package com.example.eb_backend.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@IdClass(CartItemPK.class)
@Table(name = "cart_items")
public class CartItem {
    @Id
    @Column(name = "user_id")
    private int userId;

    @Id
    @Column(name = "book_id")
    private int bookId;

    @Basic
    @Column(name = "book_num")
    private int bookNum;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "book_id", referencedColumnName = "book_id", insertable = false, updatable = false)
    private Book book;

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public int getBookNum() {
        return bookNum;
    }

    public void setBookNum(int bookNum) {
        this.bookNum = bookNum;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CartItem cartItem = (CartItem) o;
        return userId == cartItem.userId && bookId == cartItem.bookId && bookNum == cartItem.bookNum;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, bookId, bookNum);
    }
}
