DROP TABLE IF EXISTS users, books, orders, order_items, cart_items;
CREATE TABLE users
(
    user_id       INT NOT NULL AUTO_INCREMENT,
    user_name     VARCHAR(255) UNIQUE,
    user_password VARCHAR(255),
    user_type     INT DEFAULT 1,
    PRIMARY KEY (user_id)
) DEFAULT CHARSET = utf8mb4
  AUTO_INCREMENT = 1;

CREATE TABLE books
(
    book_id          INT NOT NULL AUTO_INCREMENT,
    isbn             CHAR(18),
    book_name        VARCHAR(255) UNIQUE,
    author           VARCHAR(255),
    book_price       DECIMAL(10, 2),
    book_description VARCHAR(1000),
    inventory        INT,
    PRIMARY KEY (book_id)
) DEFAULT CHARSET = utf8mb4
  AUTO_INCREMENT = 1;

CREATE TABLE orders
(
    order_id    INT NOT NULL AUTO_INCREMENT,
    user_id     INT,
    order_price DECIMAL(10, 2),
    order_date  VARCHAR(20),
    PRIMARY KEY (order_id),
    FOREIGN KEY (user_id) references users (user_id)
) DEFAULT CHARSET = utf8mb4
  AUTO_INCREMENT = 1;

CREATE TABLE order_items
(
    order_id INT NOT NULL,
    book_id  INT NOT NULL,
    book_num INT DEFAULT 1,
    FOREIGN KEY (order_id) REFERENCES orders (order_id),
    FOREIGN KEY (book_id) REFERENCES books (book_id),
    CONSTRAINT uid UNIQUE (order_id, book_id)
) DEFAULT CHARSET = utf8mb4;

CREATE TABLE cart_items
(
    user_id  INT NOT NULL,
    book_id  INT NOT NULL,
    book_num INT DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (book_id) REFERENCES books (book_id),
    CONSTRAINT uid UNIQUE (user_id, book_id)
) DEFAULT CHARSET = utf8mb4;

INSERT INTO users (user_name, user_password, user_type)
VALUES ("su", "0000", 0);

INSERT INTO users (user_name, user_password)
VALUES ("me", "1111");

INSERT INTO books (isbn, book_name, author, book_price, book_description, inventory)
VALUES ("978-7-04-056622-2",
        "毛泽东思想和中国特色社会主义理论体系概论",
        "本书编写组",
        25.00,
        "马克思主义理论研究和建设工程重点教材",
        1000);
INSERT INTO books (isbn, book_name, author, book_price, book_description, inventory)
VALUES ("978-7-302-33064-6",
        "数据结构（c++语言版）（第3版）",
        "邓俊辉",
        59.00,
        "清华大学计算机系列课程",
        200);
INSERT INTO books (isbn, book_name, author, book_price, book_description, inventory)
VALUES ("978-7-111-56127-9",
        "深入理解计算机系统（第3版）",
        "Randal E. Bryant, David R. O'Hallaron",
        239.00,
        "英文版",
        150);
INSERT INTO books (isbn, book_name, author, book_price, book_description, inventory)
VALUES ("978-7-04-036906-9",
        "软件工程原理",
        "沈备军 陈昊鹏 陈雨婷",
        48.00,
        "高等学校软件工程系列教材",
        10);