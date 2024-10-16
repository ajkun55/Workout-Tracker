CREATE DATABASE mydatabase;

\c mydatabase;

CREATE TABLE users (
id SERIAL PRIMARY KEY,
username VARCHAR(50) NOT NULL,
email VARCHAR(50) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL
);

CREATE TABLE exercises (
id SERIAL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
description VARCHAR(250) NOT NULL,
category VARCHAR(20) CHECK (category IN ('cardio', 'strength', 'flexibility')),
muscle_group VARCHAR(20),
user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE user_profiles (
id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
age INTEGER,
weight FLOAT,
fitness_goals TEXT
);
ALTER TABLE user_profiles ADD CONSTRAINT user_profiles_user_id_key UNIQUE (user_id);

CREATE TABLE workout_plan (
id SERIAL PRIMARY KEY,
exercises TEXT[] NOT NULL,
user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
date DATE NOT NULL DEFAULT CURRENT_DATE,
time TIME NOT NULL DEFAULT CURRENT_TIME,
weight FLOAT,
reps INTEGER,
sets INTEGER,
status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'pending'))
);
ALTER TABLE workout_plan
ADD CONSTRAINT unique_progress_entry UNIQUE (exercises, user_id, date, time);
