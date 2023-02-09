package com.example.ebook_back.controller;

import com.alibaba.fastjson.JSON;
import com.example.ebook_back.service.StatisticService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;


@RestController
@RequestMapping("/book")
public class StatisticController {

    @Autowired
    private StatisticService statisticService;

    @RequestMapping("/getBookSales")
    public String getBookSales(@RequestBody Map<String, String> params) {
        String start = params.get("start");
        String end = params.get("end");

        return JSON.toJSONString(statisticService.getBookSales(start, end));
    }

    @RequestMapping("/getUserSales")
    public String getUserSales(@RequestBody Map<String, String> params) {
        String start = params.get("start");
        String end = params.get("end");

        return JSON.toJSONString(statisticService.getUserSales(start, end));
    }

    @RequestMapping("/getUserStat")
    public String getUserStat(@RequestBody Map<String, String> params) {
        String username = params.get("username");
        String start = params.get("start");
        String end = params.get("end");

        return JSON.toJSONString(statisticService.getUserStat(username, start, end));
    }

}
