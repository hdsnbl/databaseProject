-- Create Game table
CREATE TABLE IF NOT EXISTS game (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    developer VARCHAR(50) NOT NULL,
    release_date DATE NOT NULL,
    genre VARCHAR(20) NOT NULL,
    platform VARCHAR(20) NOT NULL
);

-- Create User table
CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL
);

-- Create Review table
CREATE TABLE IF NOT EXISTS review (
    id SERIAL PRIMARY KEY,
    rating INTEGER NOT NULL,
    comments TEXT,
    game_id INTEGER REFERENCES game(id) NOT NULL,
    user_id INTEGER REFERENCES "user"(id) NOT NULL
);

-- Create Favorites table
CREATE TABLE IF NOT EXISTS favorites (
    id SERIAL PRIMARY KEY,
    game_id INTEGER REFERENCES game(id) NOT NULL,
    user_id INTEGER REFERENCES "user"(id) NOT NULL
);
