DROP TABLE `p2o40rwbj6zuxy26`.`users_groups`;
DROP TABLE `p2o40rwbj6zuxy26`.`users`;
DROP TABLE `p2o40rwbj6zuxy26`.`groups`;


use p2o40rwbj6zuxy26;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(99) NOT NULL,
  `address` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

  
  CREATE TABLE `p2o40rwbj6zuxy26`.`groups` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `group_name` VARCHAR(45) NOT NULL,
  `dollar_amount` INT NOT NULL,
  `active` TINYINT NOT NULL DEFAULT 1,
  `createdAt` DATETIME DEFAULT current_timestamp,
  `updatedAt` DATETIME DEFAULT current_timestamp ON UPDATE current_timestamp,
  PRIMARY KEY (`id`));

  CREATE TABLE `p2o40rwbj6zuxy26`.`users_groups` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `users_id` INT NOT NULL,
  `groups_id` INT NOT NULL,
  `assigned_user_id` INT NOT NULL DEFAULT 0,
  `role` VARCHAR(45) NOT NULL DEFAULT "user",
  `sent` TINYINT NOT NULL DEFAULT 0,
  `received` TINYINT NOT NULL DEFAULT 0,
  `createdAt` DATETIME DEFAULT current_timestamp,
  `updatedAt` DATETIME DEFAULT current_timestamp ON UPDATE current_timestamp,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`users_id`) REFERENCES users(`id`),
  FOREIGN KEY (`groups_id`) REFERENCES groups(`id`));