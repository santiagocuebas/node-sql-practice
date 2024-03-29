
CREATE DATABASE database_links;

USE database_links;

-- TABLE USER

CREATE TABLE IF NOT EXISTS users (
	`id` INT NOT NULL AUTO_INCREMENT,
	`email` VARCHAR(100) NOT NULL,
	`password` VARCHAR(60) NOT NULL,
	`name` VARCHAR(60) NOT NULL,
	`lastname` VARCHAR(60) NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY (`email`)
);

ALTER TABLE users MODIFY COLUMN `id` INT NOT NULL AUTO_INCREMENT;

DESCRIBE users;

SELECT * FROM users;

-- TABLE LINKS

CREATE TABLE IF NOT EXISTS links (
	`id` INT NOT NULL,
	`title` VARCHAR(150) NOT NULL,
	`url` VARCHAR(255) NOT NULL,
	`description` TEXT,
	`user_id` INT,
	`created_at` timestamp NOT NULL DEFAULT current_timestamp,
	CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES users(`id`),
	PRIMARY KEY (`id`)
);

ALTER TABLE links MODIFY COLUMN `id` INT NOT NULL AUTO_INCREMENT;

DESCRIBE links;

SELECT * FROM links;
