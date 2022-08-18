package com.example.ebook_back.serviceimpl;

import com.alibaba.fastjson.JSONObject;
import com.example.ebook_back.dao.OrderDao;
import com.example.ebook_back.dao.UserDao;
import com.example.ebook_back.entity.Order;
import com.example.ebook_back.entity.User;
import com.example.ebook_back.service.UserService;
import com.example.ebook_back.utils.SessionUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private OrderDao orderDao;

    @Override
    public JSONObject login(String username, String password) {
        User user = userDao.getUser(username);

        JSONObject auth = new JSONObject();
        if (Objects.equals(user.getUserPassword(), password)) {

            // 密码正确

            if (user.getUserType() == 2) {
                // 用户被禁
                auth.put("status", -1);
                auth.put("msg", "登录失败，您已被禁止登录");
                auth.put("data", null);
                return auth;
            }

            JSONObject obj = new JSONObject();
            obj.put("userId", user.getUserId());
            obj.put("username", user.getUserName());
            obj.put("userType", user.getUserType());
            SessionUtil.setSession(obj);

            auth.put("status", 0);
            auth.put("msg", "登录成功");
            auth.put("data", obj);
            return auth;

        }

        auth.put("status", -1);
        auth.put("msg", "登录失败");
        auth.put("data", null);

        return auth;
    }

    public JSONObject logout() {
        Boolean status = SessionUtil.removeSession();

        JSONObject check = new JSONObject();

        if (!status) {
            check.put("status", -1);
            check.put("msg", "未登录");
        }
        else {
            check.put("status", 0);
            check.put("msg", "已登陆");
        }
        check.put("data", null);

        return check;

    }

    public JSONObject checkSession() {
        JSONObject auth = SessionUtil.getAuth();

        JSONObject check = new JSONObject();

        if (auth == null) {
            check.put("status", -1);
            check.put("msg", "未登录");
        }
        else {
            check.put("status", 0);
            check.put("msg", "已登陆");
        }
        check.put("data", auth);

        return check;
    }

    @Override
    public ArrayList<User> getAllUsers() {
        return userDao.getAllUsers();
    }

    @Override
    public String disableUser(Integer uid) {
        User user = userDao.getUser(uid);
        user.setUserType(2);
        userDao.setUser(user);

        return "{status:1}";
    }

    @Override
    public String enableUser(Integer uid) {
        User user = userDao.getUser(uid);
        user.setUserType(0);
        userDao.setUser(user);

        return "{status:1}";
    }

    @Override
    public JSONObject signup(String username, String password) {

        JSONObject sign = new JSONObject();

        User userInDB = userDao.getUser(username);
        if (userInDB != null) {
            // 用户名重复
            sign.put("status", -1);
            sign.put("msg", "用户名重复");

            return sign;
        }

        // 新建用户
        User user = new User();
        user.setUserType(0);
        user.setUserName(username);
        user.setUserPassword(password);

        userDao.setUser(user);


        // 为新用户新建空购物车
        Date date = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String dateString = formatter.format(date).toString();

        Order newCart = new Order();
        newCart.setOrderType(1);
        newCart.setUserId(user.getUserId());
        newCart.setOrderDate(dateString);
        orderDao.setOrder(newCart);


        // 生成response内容
        sign.put("status", 0);
        sign.put("msg", "注册成功");

        return sign;
    }

}
