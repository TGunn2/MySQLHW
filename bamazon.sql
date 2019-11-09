DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
	itemid INTEGER AUTO_INCREMENT NOT NULL,
    productname VARCHAR(45) NOT NULL,
    departmentname VARCHAR(45) NOT NULL,
    price DECIMAL(10,4) NOT NULL,
    stockquantity INTEGER (10) NOT NULL,
    PRIMARY KEY (itemid)
);

INSERT INTO products(productname, departmentname, price, stockquantity)
VALUES ("uncharted 4", "video games", 50, 150),
	   ("2k", "video games", 70, 200),
       ("mad mx", "films", 30, 57),
       ("monopoly", "board games", 31, 35),
       ("cool shades", "apparel", 75, 5),
       ("towel", "necessity", 42, 42);

SELECT * FROM products;