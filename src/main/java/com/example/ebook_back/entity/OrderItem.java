package com.example.ebook_back.entity;

import javax.persistence.*;
import java.util.Objects;


@Entity
@IdClass(OrderItemPK.class)
@Table(name = "order_items", schema = "ebook", catalog = "")
public class OrderItem {
    @Id
    @Column(name = "order_id")
    private int orderId;

    @Id
    @Column(name = "book_id")
    private Integer bookId;

    @Basic
    @Column(name = "book_num")
    private Integer bookNum;

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public Integer getBookNum() {
        return bookNum;
    }

    public void setBookNum(Integer bookNum) {
        this.bookNum = bookNum;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderItem orderItem = (OrderItem) o;
        return orderId == orderItem.orderId && Objects.equals(bookId, orderItem.bookId) && Objects.equals(bookNum, orderItem.bookNum);
    }

    @Override
    public int hashCode() {
        return Objects.hash(orderId, bookId, bookNum);
    }

//    @OneToOne(targetEntity = Book.class)
//    @JoinColumn(name = "book_id", referencedColumnName = "book_id",insertable=false, updatable=false)
//    public Book book;
//
//    public Book getBook() {
//        return book;
//    }
//
//    public void setBook(Book book) {
//        this.book = book;
//    }
}
