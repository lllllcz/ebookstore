package com.example.ebook_back.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "orders", schema = "ebook", catalog = "")
public class Order {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "order_id")
    private int orderId;
    @Basic
    @Column(name = "user_id")
    private Integer userId;
    @Basic
    @Column(name = "order_price")
    private BigDecimal orderPrice;
    @Basic
    @Column(name = "order_date")
    private String orderDate;
    @Basic
    @Column(name = "order_type")
    private Integer orderType;

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public BigDecimal getOrderPrice() {
        return orderPrice;
    }

    public void setOrderPrice(BigDecimal orderPrice) {
        this.orderPrice = orderPrice;
    }

    public String getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }

    public Integer getOrderType() {
        return orderType;
    }

    public void setOrderType(Integer orderType) {
        this.orderType = orderType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Order order = (Order) o;
        return orderId == order.orderId && Objects.equals(userId, order.userId) && Objects.equals(orderPrice, order.orderPrice) && Objects.equals(orderDate, order.orderDate) && Objects.equals(orderType, order.orderType);
    }

    @Override
    public int hashCode() {
        return Objects.hash(orderId, userId, orderPrice, orderDate, orderType);
    }


    @OneToMany(targetEntity = OrderItem.class)
    @JoinColumn(name="order_id",referencedColumnName="order_id")
    public List<OrderItem> orderItems;

    public List<OrderItem> getOrderItems() { return orderItems; }

    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }
}
