   #Team 1 Users
   INSERT INTO `project_db`.`users` (`full_name`, `address`, `email`, `password`) VALUES ('Joshua Miller', '100 Weldon Blvd, Sanford, FL 32773', 'j.miller@email.com', 'pass');
   INSERT INTO `project_db`.`users` (`full_name`, `address`, `email`, `password`) VALUES ('Edwin Rodriguez', '100 Weldon Blvd, Sanford, FL 32773', 'e.rodriguez@email.com', 'pass');
   INSERT INTO `project_db`.`users` (`full_name`, `address`, `email`, `password`) VALUES ('Omar Lewis', '100 Weldon Blvd, Sanford, FL 32773', 'o.lewis@email.com', 'pass');
   INSERT INTO `project_db`.`users` (`full_name`, `address`, `email`, `password`) VALUES ('Jason Perry', '100 Weldon Blvd, Sanford, FL 32773', 'j.perry@email.com', 'pass');

   #Team 2 Users
   INSERT INTO `project_db`.`users` (`full_name`, `address`, `email`, `password`) VALUES ('David Bunner', '100 Weldon Blvd, Sanford, FL 32773', 'd.bunner@email.com', 'pass');
   INSERT INTO `project_db`.`users` (`full_name`, `address`, `email`, `password`) VALUES ('David Jourdain', '100 Weldon Blvd, Sanford, FL 32773', 'd.jourdain@email.com', 'pass');
   INSERT INTO `project_db`.`users` (`full_name`, `address`, `email`, `password`) VALUES ('Natalia Restrepo', '100 Weldon Blvd, Sanford, FL 32773', 'n.restrepo@email.com', 'pass');
   INSERT INTO `project_db`.`users` (`full_name`, `address`, `email`, `password`) VALUES ('Katherine Register', '100 Weldon Blvd, Sanford, FL 32773', 'k.register@email.com', 'pass');

   #Team 3 Users
   INSERT INTO `project_db`.`users` (`full_name`, `address`, `email`, `password`) VALUES ('Jesus Cuza', '100 Weldon Blvd, Sanford, FL 32773', 'j.cuza@email.com', 'pass');
   INSERT INTO `project_db`.`users` (`full_name`, `address`, `email`, `password`) VALUES ('Jordan Ponce', '100 Weldon Blvd, Sanford, FL 32773', 'j.ponce@email.com', 'pass');
   INSERT INTO `project_db`.`users` (`full_name`, `address`, `email`, `password`) VALUES ('Melissa Holsapple', '100 Weldon Blvd, Sanford, FL 32773', 'm.holsapple@email.com', 'pass');
   INSERT INTO `project_db`.`users` (`full_name`, `address`, `email`, `password`) VALUES ('Charles McCarthy', '100 Weldon Blvd, Sanford, FL 32773', 'c.mcCarthy@email.com', 'pass');

   #Team 4 Users
   INSERT INTO `project_db`.`users` (`full_name`, `address`, `email`, `password`) VALUES ('Lauren Farrell', '100 Weldon Blvd, Sanford, FL 32773', 'l.farrell@email.com', 'pass');
   INSERT INTO `project_db`.`users` (`full_name`, `address`, `email`, `password`) VALUES ('David Forman', '100 Weldon Blvd, Sanford, FL 32773', 'd.forman@email.com', 'pass');
   INSERT INTO `project_db`.`users` (`full_name`, `address`, `email`, `password`) VALUES ('David Reel', '100 Weldon Blvd, Sanford, FL 32773', 'd.reel@email.com', 'pass');
   INSERT INTO `project_db`.`users` (`full_name`, `address`, `email`, `password`) VALUES ('Nicholas Hodgins', '100 Weldon Blvd, Sanford, FL 32773', 'n.hodgins@email.com', 'pass');

   #Team 5 Users
   INSERT INTO `project_db`.`users` (`full_name`, `address`, `email`, `password`) VALUES ('Oscar Hedblad', '100 Weldon Blvd, Sanford, FL 32773', 'o.hedblad@email.com', 'pass');
   INSERT INTO `project_db`.`users` (`full_name`, `address`, `email`, `password`) VALUES ('Jorge Rivas', '100 Weldon Blvd, Sanford, FL 32773', 'j.rivas@email.com', 'pass');
   INSERT INTO `project_db`.`users` (`full_name`, `address`, `email`, `password`) VALUES ('Michelle Hettinger', '100 Weldon Blvd, Sanford, FL 32773', 'm.hettinger@email.com', 'pass');

   #Team 6 Users
   INSERT INTO `project_db`.`users` (`full_name`, `address`, `email`, `password`) VALUES ('John Bunner', '100 Weldon Blvd, Sanford, FL 32773', 'j.bunner@email.com', 'pass');
   INSERT INTO `project_db`.`users` (`full_name`, `address`, `email`, `password`) VALUES ('Sean Capelle', '100 Weldon Blvd, Sanford, FL 32773', 's.capelle@email.com', 'pass');
   INSERT INTO `project_db`.`users` (`full_name`, `address`, `email`, `password`) VALUES ('Thomas Zhang', '100 Weldon Blvd, Sanford, FL 32773', 't.zhang@email.com', 'pass');

   #Groups Creation
   INSERT INTO `project_db`.`groups` (`group_name`, `dollar_amount`, `active`) VALUES ('Team 1', '1000', '1');
   INSERT INTO `project_db`.`groups` (`group_name`, `dollar_amount`, `active`) VALUES ('Team 2', '1000', '1');
   INSERT INTO `project_db`.`groups` (`group_name`, `dollar_amount`, `active`) VALUES ('Team 3', '1000', '1');
   INSERT INTO `project_db`.`groups` (`group_name`, `dollar_amount`, `active`) VALUES ('Team 4', '1000', '1');
   INSERT INTO `project_db`.`groups` (`group_name`, `dollar_amount`, `active`) VALUES ('Team 5', '1000', '1');
   INSERT INTO `project_db`.`groups` (`group_name`, `dollar_amount`, `active`) VALUES ('Team 6', '1000', '1');

   #Users Groups Creation
   INSERT INTO `project_db`.`users_groups` (`users_id`, `groups_id`, `admin`, `assigned_user_id`) VALUES ((SELECT u_id FROM users WHERE full_name = 'Omar Lewis'), (SELECT g_id FROM groups WHERE group_name = 'Team 1'), '1', (SELECT u_id FROM users WHERE full_name = 'Jason Perry'));
   INSERT INTO `project_db`.`users_groups` (`users_id`, `groups_id`, `admin`, `assigned_user_id`) VALUES ((SELECT u_id FROM users WHERE full_name = 'Joshua Miller'), (SELECT g_id FROM groups WHERE group_name = 'Team 1'), '0', (SELECT u_id FROM users WHERE full_name = 'Omar Lewis'));
   INSERT INTO `project_db`.`users_groups` (`users_id`, `groups_id`, `admin`, `assigned_user_id`) VALUES ((SELECT u_id FROM users WHERE full_name = 'Edwin Rodriguez'), (SELECT g_id FROM groups WHERE group_name = 'Team 1'), '0', (SELECT u_id FROM users WHERE full_name = 'Joshua Miller'));
   INSERT INTO `project_db`.`users_groups` (`users_id`, `groups_id`, `admin`, `assigned_user_id`) VALUES ((SELECT u_id FROM users WHERE full_name = 'Jason Perry'), (SELECT g_id FROM groups WHERE group_name = 'Team 1'), '0', (SELECT u_id FROM users WHERE full_name = 'Edwin Rodriguez'));
   INSERT INTO `project_db`.`users_groups` (`users_id`, `groups_id`, `admin`, `assigned_user_id`) VALUES ((SELECT u_id FROM users WHERE full_name = 'David Jourdain'), (SELECT g_id FROM groups WHERE group_name = 'Team 2'), '1', (SELECT u_id FROM users WHERE full_name = 'Natalia Restrepo'));
   INSERT INTO `project_db`.`users_groups` (`users_id`, `groups_id`, `admin`, `assigned_user_id`) VALUES ((SELECT u_id FROM users WHERE full_name = 'Katherine Register'), (SELECT g_id FROM groups WHERE group_name = 'Team 2'), '0', (SELECT u_id FROM users WHERE full_name = 'David Jourdain'));
   INSERT INTO `project_db`.`users_groups` (`users_id`, `groups_id`, `admin`, `assigned_user_id`) VALUES ((SELECT u_id FROM users WHERE full_name = 'David Bunner'), (SELECT g_id FROM groups WHERE group_name = 'Team 2'), '0', (SELECT u_id FROM users WHERE full_name = 'Katherine Register'));
   INSERT INTO `project_db`.`users_groups` (`users_id`, `groups_id`, `admin`, `assigned_user_id`) VALUES ((SELECT u_id FROM users WHERE full_name = 'Natalia Restrepo'), (SELECT g_id FROM groups WHERE group_name = 'Team 2'), '0', (SELECT u_id FROM users WHERE full_name = 'David Bunner'));
   INSERT INTO `project_db`.`users_groups` (`users_id`, `groups_id`, `admin`, `assigned_user_id`) VALUES ((SELECT u_id FROM users WHERE full_name = 'Melissa Holsapple'), (SELECT g_id FROM groups WHERE group_name = 'Team 3'), '1', (SELECT u_id FROM users WHERE full_name = 'Charles McCarthy'));
   INSERT INTO `project_db`.`users_groups` (`users_id`, `groups_id`, `admin`, `assigned_user_id`) VALUES ((SELECT u_id FROM users WHERE full_name = 'Jordan Ponce'), (SELECT g_id FROM groups WHERE group_name = 'Team 3'), '0', (SELECT u_id FROM users WHERE full_name = 'Melissa Holsapple'));
   INSERT INTO `project_db`.`users_groups` (`users_id`, `groups_id`, `admin`, `assigned_user_id`) VALUES ((SELECT u_id FROM users WHERE full_name = 'Jesus Cuza'), (SELECT g_id FROM groups WHERE group_name = 'Team 3'), '0', (SELECT u_id FROM users WHERE full_name = 'Jordan Ponce'));
   INSERT INTO `project_db`.`users_groups` (`users_id`, `groups_id`, `admin`, `assigned_user_id`) VALUES ((SELECT u_id FROM users WHERE full_name = 'Charles McCarthy'), (SELECT g_id FROM groups WHERE group_name = 'Team 3'), '0', (SELECT u_id FROM users WHERE full_name = 'Jesus Cuza'));
   INSERT INTO `project_db`.`users_groups` (`users_id`, `groups_id`, `admin`, `assigned_user_id`) VALUES ((SELECT u_id FROM users WHERE full_name = 'Lauren Farrell'), (SELECT g_id FROM groups WHERE group_name = 'Team 4'), '1', (SELECT u_id FROM users WHERE full_name = 'David Reel'));
   INSERT INTO `project_db`.`users_groups` (`users_id`, `groups_id`, `admin`, `assigned_user_id`) VALUES ((SELECT u_id FROM users WHERE full_name = 'Nicholas Hodgins'), (SELECT g_id FROM groups WHERE group_name = 'Team 4'), '0', (SELECT u_id FROM users WHERE full_name = 'Lauren Farrell'));
   INSERT INTO `project_db`.`users_groups` (`users_id`, `groups_id`, `admin`, `assigned_user_id`) VALUES ((SELECT u_id FROM users WHERE full_name = 'David Forman'), (SELECT g_id FROM groups WHERE group_name = 'Team 4'), '0', (SELECT u_id FROM users WHERE full_name = 'Nicholas Hodgins'));
   INSERT INTO `project_db`.`users_groups` (`users_id`, `groups_id`, `admin`, `assigned_user_id`) VALUES ((SELECT u_id FROM users WHERE full_name = 'David Reel'), (SELECT g_id FROM groups WHERE group_name = 'Team 4'), '0', (SELECT u_id FROM users WHERE full_name = 'David Forman'));
   INSERT INTO `project_db`.`users_groups` (`users_id`, `groups_id`, `admin`, `assigned_user_id`) VALUES ((SELECT u_id FROM users WHERE full_name = 'Oscar Hedblad'), (SELECT g_id FROM groups WHERE group_name = 'Team 5'), '1', (SELECT u_id FROM users WHERE full_name = 'Jorge Rivas'));
   INSERT INTO `project_db`.`users_groups` (`users_id`, `groups_id`, `admin`, `assigned_user_id`) VALUES ((SELECT u_id FROM users WHERE full_name = 'Michelle Hettinger'), (SELECT g_id FROM groups WHERE group_name = 'Team 5'), '0', (SELECT u_id FROM users WHERE full_name = 'Oscar Hedblad'));
   INSERT INTO `project_db`.`users_groups` (`users_id`, `groups_id`, `admin`, `assigned_user_id`) VALUES ((SELECT u_id FROM users WHERE full_name = 'Jorge Rivas'), (SELECT g_id FROM groups WHERE group_name = 'Team 5'), '0', (SELECT u_id FROM users WHERE full_name = 'Michelle Hettinger'));
   INSERT INTO `project_db`.`users_groups` (`users_id`, `groups_id`, `admin`, `assigned_user_id`) VALUES ((SELECT u_id FROM users WHERE full_name = 'John Bunner'), (SELECT g_id FROM groups WHERE group_name = 'Team 6'), '1', (SELECT u_id FROM users WHERE full_name = 'Thomas Zhang'));
   INSERT INTO `project_db`.`users_groups` (`users_id`, `groups_id`, `admin`, `assigned_user_id`) VALUES ((SELECT u_id FROM users WHERE full_name = 'Sean Capelle'), (SELECT g_id FROM groups WHERE group_name = 'Team 6'), '0', (SELECT u_id FROM users WHERE full_name = 'John Bunner'));
   INSERT INTO `project_db`.`users_groups` (`users_id`, `groups_id`, `admin`, `assigned_user_id`) VALUES ((SELECT u_id FROM users WHERE full_name = 'Thomas Zhang'), (SELECT g_id FROM groups WHERE group_name = 'Team 6'), '0', (SELECT u_id FROM users WHERE full_name = 'Sean Capelle'));