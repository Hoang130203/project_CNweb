package com.example.backend.backend.payos.type;


public class ItemData {
    private String name;
    private int quantity;
    private int price;

    public ItemData(String name, int quantity, int price) {
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }

    public String getName() {
        return this.name;
    }

    public int getQuantity() {
        return this.quantity;
    }

    public int getPrice() {
        return this.price;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}