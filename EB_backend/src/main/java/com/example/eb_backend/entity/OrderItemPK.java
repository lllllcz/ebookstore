package com.example.eb_backend.entity;

import java.io.Serializable;
import java.util.Objects;

public class OrderItemPK implements Serializable {
    private int orderId;
    private int bookId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderItemPK that = (OrderItemPK) o;
        return orderId == that.orderId && bookId == that.bookId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(orderId, bookId);
    }
}
