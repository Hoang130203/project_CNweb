package com.example.backend.backend.Entity.Enum_Key;

public enum ESize {
    _2GB_8GB("2GB/8GB"),
    _3GB_12GB("3GB/12GB"),
    _4GB_16GB("4GB/16GB"),
    _6GB_64GB("6GB/64GB"),
    _8GB_128GB("8GB/128GB"),
    _8GB_256GB("8GB/256GB"),
    _8GB_512GB("8GB/512GB"),
    _16GB_64GB("16GB/64GB"),
    _16GB_256GB("16GB/256GB"),
    _16GB_1TB("16GB/1TB"),
    _32GB_128GB("32GB/128GB"),
    _32GB_512GB("32GB/512GB"),
    _32GB_1TB("32GB/1TB"),
    _64GB_256GB("64GB/256GB"),
    _64GB_512GB("64GB/512GB"),
    _64GB_1TB("64GB/1TB"),
    _128GB_512GB("128GB/512GB"),
    _256GB_1TB("256GB/1TB"),
    _512GB_2TB("512GB/2TB"),
    _1TB_4TB("1TB/4TB"),
    X("X"),
    XS("XS"),
    XL("XL"),
    S("S"),
    M("M"),
    L("L"),
    XXL("XXL"),
    XXXL("XXXL"),
    _24("24"),
    _30("30"),
    _36("36"),
    _42("42"),
    _48("48");
    private final String displayName;

    ESize(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
}
