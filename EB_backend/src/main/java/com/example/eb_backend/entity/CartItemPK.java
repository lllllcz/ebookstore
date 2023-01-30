package com.example.eb_backend.entity;

import java.io.Serializable;
import java.util.Objects;

public class CartItemPK implements Serializable {
    private int userId;
    private int bookId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CartItemPK that = (CartItemPK) o;
        return userId == that.userId && bookId == that.bookId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, bookId);
    }
}
