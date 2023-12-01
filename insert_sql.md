-- Sample data for the game table
INSERT INTO game (title, developer, release_date, genre, platform)
VALUES
  ('Title1', 'Developer1', '2022-01-01', 'Action', 'PC'),
  ('Title2', 'Developer2', '2022-02-15', 'Adventure', 'PlayStation'),
  ('Title3', 'Developer3', '2022-03-20', 'Sports', 'Xbox'),
  ('Title4', 'Developer4', '2022-04-10', 'RPG', 'Nintendo Switch');

-- Sample data for the user table
INSERT INTO "user" (username, email, password)
VALUES
  ('User1', 'user1@example.com', 'password1'),
  ('User2', 'user2@example.com', 'password2'),
  ('User3', 'user3@example.com', 'password3'),
  ('User4', 'user4@example.com', 'password4');

-- IMPORTANT: MUST DO JUST THE user AND game TABLE DATA FIRST BEFORE DOING THE review AND favorites TABLE DATA

-- Sample data for the review table
INSERT INTO review (rating, comments, game_id, user_id)
VALUES
  (4, 'Enjoyable game', 1, 1),
  (5, 'Fantastic experience', 2, 2),
  (3, 'Good gameplay', 3, 3),
  (4, 'Interesting storyline', 4, 4);

-- Sample data for the favorites table
INSERT INTO favorites (game_id, user_id)
VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4);
