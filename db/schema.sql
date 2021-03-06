drop database project_db;

create database project_db;

use project_db;
 
CREATE TABLE `project_db`.`users` (
  `u_id` INT NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(99) NOT NULL,
  `address` VARCHAR(45) DEFAULT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `wishes` varchar(500) DEFAULT NULL,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`u_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

  
CREATE TABLE `project_db`.`groups` (
  `g_id` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(45) NOT NULL,
  `dollar_amount` int(11) NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`g_id`),
  UNIQUE KEY `group_name_UNIQUE` (`group_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `project_db`.`users_groups` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `users_id` INT NOT NULL,
  `groups_id` INT NOT NULL,
  `admin` TINYINT NOT NULL DEFAULT 0,
  `item_note` VARCHAR(200),
  `assigned_user_id` INT NOT NULL DEFAULT 0,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`users_id`) REFERENCES users(`u_id`),
  FOREIGN KEY (`groups_id`) REFERENCES groups(`g_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;