package com.example.eb_backend.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@IdClass(OrderItemPK.class)
@Table(name = "order_items")
public class OrderItem {

    @Id
    @Column(name = "order_id")
    private int orderId;

    @Id
    @Column(name = "book_id")
    private int bookId;

    @Basic
    @Column(name = "book_num")
    private int bookNum;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "book_id", referencedColumnName = "book_id", insertable = false, updatable = false)
    private Book book;

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderItem orderItem = (OrderItem) o;
        return orderId == orderItem.orderId && bookId == orderItem.bookId && bookNum == orderItem.bookNum && Objects.equals(book, orderItem.book);
    }

    @Override
    public int hashCode() {
        return Objects.hash(orderId, bookId, bookNum, book);
    }

}
