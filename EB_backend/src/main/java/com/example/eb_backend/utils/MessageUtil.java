package com.example.eb_backend.utils;

import com.alibaba.fastjson.JSONObject;

public class MessageUtil {
    public static String message(int state, String msg, Object data) {
        JSONObject json = new JSONObject();
        json.put("state", state);
        json.put("msg", msg);
        json.put("data", data);
        return json.toJSONString();
    }
}
