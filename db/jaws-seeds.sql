USE p2o40rwbj6zuxy26;

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
  -- Set michelle as admin
  INSERT INTO users_groups (users_id, groups_id, admin)
  VALUES (1, 1, 1);
  

  INSERT INTO groups (group_name, dollar_amount)
  VALUES ("Oscar's Group", 20);
  -- Set Oscar as admin
  INSERT INTO users_groups (users_id, groups_id, admin)
  VALUES (2, 2, 1);  
  

  INSERT INTO groups (group_name, dollar_amount)
  VALUES ("Jorge's Group", 50);
    -- set oscar as admin
  INSERT INTO users_groups (users_id, groups_id, admin)
  VALUES (3, 3, 1);

-- When a user is added to a group

    -- Michelle added to other 2
  INSERT INTO users_groups (users_id, groups_id)
  VALUES (1, 2);
  --
  INSERT INTO users_groups (users_id, groups_id)
  VALUES (1, 3);
  
    -- Oscar added to other 2
  INSERT INTO users_groups (users_id, groups_id)
  VALUES (2, 1);
  --
  INSERT INTO users_groups(users_id, groups_id)
  VALUES (2, 3);
  
      -- Jorge added to other 2
  INSERT INTO users_groups (users_id, groups_id)
  VALUES (3, 1);
  --
  INSERT INTO users_groups(users_id, groups_id)
  VALUES (3, 2);