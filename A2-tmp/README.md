
```
CREATE DATABASE IF NOT EXISTS BookStore;

USE BookStore;

CREATE TABLE IF NOT EXISTS Customer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    address VARCHAR(255),
    address2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(50),
    zipcode VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS Book (
    ISBN VARCHAR(20) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    Author VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    genre VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL
);
```


```
USE BookStore;

INSERT INTO Customer (userId, name, phone, address, address2, city, state, zipcode) VALUES
('customer1@example.com', 'John Doe', '555-1234', '123 Main St', 'Apt 101', 'Cityville', 'CA', '12345'),
('customer2@example.com', 'Jane Smith', '555-5678', '456 Oak St', '', 'Townsville', 'NY', '67890'),
('customer3@example.com', 'Bob Johnson', '555-9876', '789 Elm St', 'Suite 203', 'Villagetown', 'TX', '45678'),
('customer4@example.com', 'Alice Williams', '555-4321', '101 Pine St', '', 'Hamletville', 'FL', '23456'),
('customer5@example.com', 'Charlie Brown', '555-8765', '202 Cedar St', 'Unit 42', 'Villageton', 'AZ', '78901'),
('customer6@example.com', 'Eva Davis', '555-6543', '303 Birch St', '', 'Citytown', 'IL', '34567'),
('customer7@example.com', 'Frank Miller', '555-2345', '404 Maple St', 'Apt 303', 'Metropolis', 'WA', '56789'),
('customer8@example.com', 'Grace Taylor', '555-7890', '505 Oak St', '', 'Villageville', 'GA', '89012'),
('customer9@example.com', 'David Lee', '555-0123', '606 Pine St', 'Suite 101', 'Hometown', 'OH', '12367'),
('customer10@example.com', 'Helen Turner', '555-3456', '707 Cedar St', '', 'Hamletton', 'MI', '89023');

```


```
INSERT INTO Book (ISBN, title, Author, description, genre, price, quantity) VALUES
('978-0321815736', 'Software Architecture in Practice', 'Bass, L.', 'Seminal book on software architecture', 'non-fiction', 59.95, 106),
('978-0596007126', 'Learning Python', 'Lutz, M.', 'Comprehensive introduction to Python programming', 'non-fiction', 39.99, 75),
('978-0132350884', 'Clean Code', 'Martin, R. C.', 'Guide to writing clean, maintainable code', 'non-fiction', 42.50, 90),
('978-1449319274', 'JavaScript: The Good Parts', 'Crockford, D.', 'Explains the good parts of JavaScript programming language', 'non-fiction', 29.99, 120),
('978-0201633610', 'Design Patterns: Elements of Reusable Object-Oriented Software', 'Gamma, E. et al.', 'Classic book on software design patterns', 'non-fiction', 55.00, 80);
```



```
docker ps -a
docker rm {}
docker build -t your_dockerhub_username/nodejs-image-demo .
docker run --name nodejs-image-demo -p 8080:8080 -d your_dockerhub_username/nodejs-image-demo
docker logs {}
```