USE p2o40rwbj6zuxy26;

-- When a user signs up  
  
  INSERT INTO users (full_name, address, email, password)
  VALUES ("Michelle Hettinger", "513 Oakwood Court, 32714", "mellowmichellehet@gmail.com", "michelle41989");
  
  INSERT INTO users (full_name, address, email, password)
  VALUES ("Oscar Hedblad", "something", "something@something", "something");
 
  INSERT INTO users (full_name, address, email, password)
  VALUES ("Jorge Rivas", "something2", "something2@something", "something");
  
  
-- When a group is created. The creator is assigned as admin
  
  INSERT INTO groups (group_name, dollar_amount)
  VALUES ("Original Gift Buddies", 50);

  INSERT INTO groups (group_name, dollar_amount)
  VALUES ("sECOND Group", 50);

  INSERT INTO groups (group_name, dollar_amount)
  VALUES ("Third Group", 50);

  INSERT INTO users_groups (users_id, groups_id, role)
  VALUES (1, 1, "admin");


-- When a user is added to the group

  INSERT INTO users_groups (users_id, groups_id)
  VALUES (2, 1);

  INSERT INTO users_groups (users_id, groups_id)
  VALUES (3, 1);
