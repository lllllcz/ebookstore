package com.example.name_search.service;

import com.alibaba.fastjson.JSONObject;
import com.example.name_search.entity.Book;
import netscape.javascript.JSObject;

import java.util.ArrayList;
import java.util.Map;

public interface BookService {

    Book getBook(String bookName);

}
