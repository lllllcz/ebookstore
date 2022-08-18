INSERT INTO users ( user_name, user_password) VALUES ("me", 1111);

INSERT INTO books (isbn, book_name, author, book_price, book_description, inventory, img_url)
VALUES (
	"978-7-04-056622-2", 
    "毛泽东思想和中国特色社会主义理论体系概论",
    "本书编写组", 
    25.00, 
    "介绍：马克思主义理论研究和建设工程重点教材", 
    1000,
    "../assets/maoze.jpg"
);
INSERT INTO books (isbn, book_name, author, book_price, book_description, inventory, img_url)
VALUES (
	"978-7-302-33064-6", 
    "数据结构（c++语言版）（第3版）",
    "邓俊辉", 
    59.00, 
    "介绍：清华大学计算机系列课程", 
    200,
    "../assets/shuju.jpg"
);
INSERT INTO books (isbn, book_name, author, book_price, book_description, inventory)
VALUES (
	"978-7-111-56127-9", 
    "深入理解计算机系统（第3版）",
    "Randal E. Bryant, David R. O'Hallaron", 
    239.00, 
    "介绍：英文版", 
    150
);
INSERT INTO books (isbn, book_name, author, book_price, book_description, inventory)
VALUES (
	"978-7-04-036906-9", 
    "软件工程原理",
    "沈备军 陈昊鹏 陈雨婷", 
    48.00, 
    "介绍：高等学校软件工程系列教材", 
    10
);

INSERT INTO orders (user_id, order_type) VALUES (1, 1);

INSERT INTO order_items VALUES (1, 1, 1);
