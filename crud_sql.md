-- Create a new game
INSERT INTO game (title, developer, release_date, genre, platform)
VALUES ('New Game', 'New Developer', '2022-05-01', 'New Genre', 'New Platform');

-- Create a new user
INSERT INTO "user" (username, email, password)
VALUES ('NewUser', 'newuser@example.com', 'newpassword');

-- Create a new review
INSERT INTO review (rating, comments, game_id, user_id)
VALUES (5, 'Amazing game!', 1, 1);

-- Create a new favorite
INSERT INTO favorites (game_id, user_id)
VALUES (1, 1);

-- Read all games
SELECT * FROM game;

-- Read all users
SELECT * FROM "user";

-- Read all reviews
SELECT * FROM review;

-- Read all favorites
SELECT * FROM favorites;

-- Update a game
UPDATE game
SET title = 'Updated Title'
WHERE id = 1;

-- Update a user
UPDATE "user"
SET username = 'UpdatedUser'
WHERE id = 1;

-- Update a review
UPDATE review
SET rating = 3
WHERE id = 1;

-- Delete a game
DELETE FROM game
WHERE id = 1;

-- Delete a user
DELETE FROM "user"
WHERE id = 1;

-- Delete a review
DELETE FROM review
WHERE id = 1;

-- Delete a favorite
DELETE FROM favorites
WHERE id = 1;
