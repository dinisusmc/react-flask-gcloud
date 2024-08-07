CREATE DATABASE todolist2;

CREATE TABLE IF NOT EXISTS users
(
    uid serial primary key,
    last_name varchar NOT NULL,
    first_name varchar NOT NULL
    )

CREATE TABLE IF NOT EXISTS tasks
(
    id varchar not null,
    what_to_do varchar NOT NULL,
    complete boolean DEFAULT false,
    due_date date
    )


INSERT INTO users (last_name, first_name ) VALUES 
    ('Bobby','Ricky'),
    ('Norris', 'Chuck');


INSERT INTO tasks(id, what_to_do, due_date) VALUES 
    ('1', 'Homework', '6-aug-2024'),
    ('1', 'Sleep', '6-aug-2055'),
    ('1', 'Cook Pasta', '7-aug-2024'),
    ('2', 'Pushups', '6-aug-2024'),
    ('2', 'More Pushups', '6-aug-2024'),
    ('2', 'Still More Pushups', '6-aug-2024');

