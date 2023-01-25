package com.example.eb_backend.serviceimpl;

import com.alibaba.fastjson.JSONObject;
import com.example.eb_backend.dao.UserDao;
import com.example.eb_backend.entity.User;
import com.example.eb_backend.service.UserService;
import com.example.eb_backend.utils.MessageUtil;
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

        if (user == null) {
            return MessageUtil.message(-1, "没有这个用户", null);
        }
        if (Objects.equals(user.getUserPassword(), password)) {

            JSONObject obj = new JSONObject();
            obj.put("userId", user.getUserId());
            obj.put("username", user.getUserName());
            obj.put("userType", user.getUserType());
            SessionUtil.setSession(obj);

            return MessageUtil.message(0, "登录成功", obj);
        }
        else {
            return MessageUtil.message(-1, "登录失败", null);
        }
    }

    @Override
    public String checkSession() {
        JSONObject auth = SessionUtil.getAuth();

        if (auth == null) {
            return MessageUtil.message(-1, "Check session error", null);
        }
        else {
            return MessageUtil.message(0, "Check session ok", auth);
        }

    }

    @Override
    public String logout() {
        SessionUtil.removeSession();
        return MessageUtil.message(-1, "Logout succeed", null);
    }

    @Override
    public String signup(String username, String password) {
        User user = userDao.getUser(username);
        if (user != null) {
            return MessageUtil.message(-1, "用户名重复", null);
        }
        user = new User();
        user.setUserName(username);
        user.setUserPassword(password);
        user.setUserType(1);
        userDao.setUser(user);
        return MessageUtil.message(0, "Sign up succeed", null);
    }
}
