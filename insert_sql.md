-- Sample data for the game table
INSERT INTO game (title, developer, release_date, genre, platform)
VALUES
  ('Title1', 'Developer1','Action'),
  ('Title2', 'Developer2', 'Adventure'),
  ('Title3', 'Developer3', 'Sports'),
  ('Title4', 'Developer4',  'RPG', );

-- Sample data for the user table
INSERT INTO "user" (username, email, password)
VALUES
  ('User1', 'user1@example.com', 'password1'),
  ('User2', 'user2@example.com', 'password2'),
  ('User3', 'user3@example.com', 'password3'),
  ('User4', 'user4@example.com', 'password4');

-- IMPORTANT: MUST DO JUST THE user AND game TABLE DATA FIRST BEFORE DOING THE review AND favorites TABLE DATA
-- ALSO: You will have to change the game_id and user_id to match what is in your game and user tables

-- Sample data for the review table
INSERT INTO review (rating, comments, gameid, userid)
VALUES
  (4, 'Enjoyable game', 1, 1),
  (5, 'Fantastic experience', 2, 2),
  (3, 'Good gameplay', 3, 3),
  (4, 'Interesting storyline', 4, 4);

-- Sample data for the favorites table
INSERT INTO favorites (gameid, userid)
VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4);
