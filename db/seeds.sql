   USE project_db;

-- When a user signs up  
  
  INSERT INTO users (full_name, address, email, password)
  VALUES ("Michelle Hettinger", "513 Oakwood Court, 32714", "mellowmichellehet@gmail.com", "michelle41989");
  
  INSERT INTO users (full_name, address, email, password)
  VALUES ("Oscar Hedblad", "something", "Q@Q", "q");
 
  INSERT INTO users (full_name, address, email, password)
  VALUES ("Jorge Rivas", "something2", "something2@something", "something");
  
  
-- When a group is created. The creator is assigned as admin
  
  INSERT INTO groups (group_name, dollar_amount)
  VALUES ("Original Gift Buddies", 10);

  INSERT INTO groups (group_name, dollar_amount)
  VALUES ("Second Group", 20);

  INSERT INTO groups (group_name, dollar_amount)
  VALUES ("Third Group", 50);

  INSERT INTO users_groups (users_id, groups_id, admin)
  VALUES (1, 1, 1);

  INSERT INTO users_groups (users_id, groups_id, admin)
  VALUES (1, 2, 1);

  INSERT INTO users_groups (users_id, groups_id, admin)
  VALUES (1, 3, 1);

-- When a user is added to the group

  INSERT INTO users_groups (users_id, groups_id)
  VALUES (2, 1);

  INSERT INTO users_groups (users_id, groups_id)
  VALUES (3, 1);
  
  INSERT INTO users_groups(users_id, groups_id)
  VALUES (2, 2);
  
  INSERT INTO users_groups(users_id, groups_id)
  VALUES (2, 3);
  
-- Take a look at the users_groups table!

  SELECT * FROM project_db.users_groups;