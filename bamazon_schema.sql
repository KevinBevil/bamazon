DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NULL,
  price INT(10),
  stock_quantity INT(100) default 0,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Mabelline Lipstick', 'Health & Beauty', 11, 140);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Walking Cane', 'Sports & Outdoors', 22, 36);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('24 pk Monster Energy Drinks', 'Food & Beverage', 35, 90);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('SOG Pocket Knife', 'Sports & Outdoors', 48, 280);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Dell Laptop Computer', 'Computers', 1200, 114);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Toddler Swimmer Arm Floats', 'Sports & Outdoors', 8, 386);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Calvin Klein Leather Belt', 'Clothing', 25, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Spiderman Action Figure', 'Toys', 12, 1108);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Kindle Wall Charger', 'Electronics', 13, 1679);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Apple Watch', 'Electronics', 490, 123);
