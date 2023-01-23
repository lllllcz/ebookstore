package com.example.eb_backend.serviceimpl;

import com.alibaba.fastjson.JSONObject;
import com.example.eb_backend.dao.UserDao;
import com.example.eb_backend.entity.User;
import com.example.eb_backend.service.UserService;
import com.example.eb_backend.utils.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Override
    public String login(String username, String password) {
        User user = userDao.getUser(username);
//        System.out.println(user);

        JSONObject auth = new JSONObject();
        if (user == null) {
            auth.put("status", -1);
            auth.put("msg", "没有这个用户");
            auth.put("data", null);
            return auth.toJSONString();
        }
        if (Objects.equals(user.getUserPassword(), password)) {

//            if (user.getUserType() == 2) {
//                auth.put("status", -1);
//                auth.put("msg", "登录失败，您已被禁止登录");
//                auth.put("data", null);
//                return auth;
//            }

            JSONObject obj = new JSONObject();
            obj.put("userId", user.getUserId());
            obj.put("username", user.getUserName());
            obj.put("userType", user.getUserType());
            SessionUtil.setSession(obj);

            auth.put("status", 0);
            auth.put("msg", "登录成功");
            auth.put("data", obj);

        }
        else {
            auth.put("status", -1);
            auth.put("msg", "登录失败");
            auth.put("data", null);
        }
        return auth.toJSONString();
    }

    @Override
    public String checkSession() {
        JSONObject auth = SessionUtil.getAuth();

        JSONObject check = new JSONObject();

        if (auth == null) {
            check.put("status", -1);
            check.put("msg", "Check session error");
            check.put("data", null);
        }
        else {
            check.put("status", 0);
            check.put("msg", "Check session ok");
            check.put("data", auth);
        }

        return check.toJSONString();
    }

    @Override
    public String logout() {
        SessionUtil.removeSession();

        JSONObject check = new JSONObject();

        check.put("status", -1);
        check.put("msg", "Logout succeed");
        check.put("data", null);

        return check.toJSONString();
    }
}
