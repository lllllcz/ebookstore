# E Bookstore

电子书店项目是2022年春季学期我的课程作业。

`old_version`是春季学期结束时的作业。

后来，2022年秋季学期，陈老师又讲授了对原有项目的优化，以及加入一些其他工具、功能，在原有代码中新增了一些内容。但是我感觉学期结束后，这个项目变得有些 ugly，于是我利用寒假时间重写了一遍。

---

## Redis

缓存书籍

运行项目前应打开 redis server

    >.\service\redis\redis-server.exe

---

## Solr

全文搜索

运行项目前打开 solr

    >.\service\solr-8.11.2\bin\solr.cmd start

打开 `solr-8.11.2\server\solr` 目录，新建一个文件夹，并将当前目录下的 `configsets\_default\conf` 拷贝到新建的文件夹中。在浏览器中打开 `http://localhost:8983/solr/#/` ，新增一个 core 对应于刚刚新建的文件夹。

关闭项目后停止 solr

    >.\service\solr-8.11.2\bin\solr.cmd stop -p 8983

---

## WebSocket

后端可向前端推送消息。