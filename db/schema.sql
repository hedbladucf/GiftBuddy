drop database project_db;

create database project_db;

use project_db;
 
CREATE TABLE `project_db`.`users` (
  `u_id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(99) NOT NULL,
  `address` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

  
  CREATE TABLE `project_db`.`groups` (
  `g_id` INT NOT NULL AUTO_INCREMENT,
  `group_name` VARCHAR(45) NOT NULL,
  `dollar_amount` INT NOT NULL,
  `active` TINYINT NOT NULL DEFAULT 1,
  `createdAt` DATETIME DEFAULT current_timestamp,
  PRIMARY KEY (`g_id`));

  CREATE TABLE `project_db`.`users_groups` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `users_id` INT NOT NULL,
  `groups_id` INT NOT NULL,
  `assigned_user_id` INT NOT NULL DEFAULT 0,
  `admin` TINYINT NOT NULL DEFAULT 0,
  `sent` TINYINT NOT NULL DEFAULT 0,
  `received` TINYINT NOT NULL DEFAULT 0,
  `createdAt` DATETIME DEFAULT current_timestamp,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`users_id`) REFERENCES users(`u_id`),
  FOREIGN KEY (`groups_id`) REFERENCES groups(`g_id`));