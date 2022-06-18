
CREATE DATABASE database_links;

USE database_links;

-- TABLE USER

CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(16) NOT NULL,
	password VARCHAR(60) NOT NULL,
	fullname VARCHAR(100) NOT NULL,
	PRIMARY KEY (id)
);

ALTER TABLE users MODIFY COLUMN id INT NOT NULL AUTO_INCREMENT;

DESCRIBE users;

SELECT * FROM users;

-- TABLE LINKS

CREATE TABLE links (
	id INT NOT NULL,
	title VARCHAR(150) NOT NULL,
	url VARCHAR(255) NOT NULL,
	description TEXT,
	user_id INT,
	created_at timestamp NOT NULL DEFAULT current_timestamp,
	CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id),
	PRIMARY KEY (id)
);

ALTER TABLE links MODIFY id INT NOT NULL AUTO_INCREMENT;

DESCRIBE links;

SELECT * FROM links;
