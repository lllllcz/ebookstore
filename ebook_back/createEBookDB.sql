DROP TABLE IF EXISTS users, books, orders, order_items;
CREATE TABLE users (
	user_id INT NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(255) UNIQUE,
    user_password VARCHAR(255),
    user_type INT DEFAULT 0,
    PRIMARY KEY (user_id)
)DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=1;

CREATE TABLE books (
	book_id INT NOT NULL AUTO_INCREMENT,
    isbn VARCHAR(255),
    book_name VARCHAR(255) UNIQUE,
    author VARCHAR(255),
    book_price DECIMAL(10,2),
    book_description VARCHAR(1000),
    inventory INT,
    img_url VARCHAR(255),
    PRIMARY KEY (book_id)
)DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=1;

CREATE TABLE orders (
	order_id INT NOT NULL AUTO_INCREMENT,
    user_id INT,
    order_price DECIMAL(10,2),
    order_date VARCHAR(20),
    order_type INT DEFAULT 0,
    PRIMARY KEY (order_id),
    FOREIGN KEY (user_id) references users(user_id)
)DEFAULT CHARSET=utf8mb4 AUTO_INCREMENT=1;

CREATE TABLE order_items (
	order_id INT NOT NULL,
    book_id INT,
    book_num INT DEFAULT 1,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id),
    CONSTRAINT uid UNIQUE (order_id, book_id)
)DEFAULT CHARSET=utf8mb4 ;
