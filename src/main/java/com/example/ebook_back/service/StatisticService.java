package com.example.ebook_back.service;

import com.alibaba.fastjson.JSONObject;

import java.util.ArrayList;

public interface StatisticService {

    ArrayList<JSONObject> getBookSales(String start, String end);

    ArrayList<JSONObject> getUserSales(String start, String end);

    JSONObject getUserStat(String username, String start, String end);

}
