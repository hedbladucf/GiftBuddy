DROP TABLE `p2o40rwbj6zuxy26`.`users_groups`;
DROP TABLE `p2o40rwbj6zuxy26`.`users`;
DROP TABLE `p2o40rwbj6zuxy26`.`groups`;


use p2o40rwbj6zuxy26;

CREATE TABLE `p2o40rwbj6zuxy26`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(99) NOT NULL,
  `address` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));
  
  CREATE TABLE `p2o40rwbj6zuxy26`.`groups` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `group_name` VARCHAR(45) NOT NULL,
  `dollar_amount` INT NOT NULL,
  `active` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`));

  CREATE TABLE `p2o40rwbj6zuxy26`.`users_groups` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `users_id` INT NOT NULL,
  `groups_id` INT NOT NULL,
  `assigned_user_id` INT NOT NULL DEFAULT 0,
  `role` VARCHAR(45) NOT NULL DEFAULT "user",
  `sent` TINYINT NOT NULL DEFAULT 0,
  `received` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`users_id`) REFERENCES users(`id`),
  FOREIGN KEY (`groups_id`) REFERENCES groups(`id`));