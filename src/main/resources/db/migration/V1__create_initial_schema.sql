CREATE TYPE role AS ENUM ('ADMIN', 'NORMAL');

CREATE CAST (varchar AS role) WITH INOUT AS IMPLICIT;

CREATE TABLE users
(
    user_id       SERIAL PRIMARY KEY,
    username      VARCHAR(255) UNIQUE,
    email         VARCHAR(255) UNIQUE,
    password      VARCHAR(255),
    register_date TIMESTAMP,
    user_role     role,
    is_account_non_expired      BOOLEAN DEFAULT true,
    is_account_non_locked       BOOLEAN DEFAULT true,
    is_credentials_non_expired  BOOLEAN DEFAULT true,
    is_enabled                  BOOLEAN DEFAULT true
);

CREATE TABLE subject
(
    subject_id   SERIAL PRIMARY KEY,
    subject_name VARCHAR(255)
);

CREATE TABLE quiz
(
    quiz_id           SERIAL PRIMARY KEY,
    quiz_title        VARCHAR(255),
    quiz_description  TEXT,
    quiz_date_created TIMESTAMP,
    user_id           INTEGER NOT NULL,
    subject_id        INTEGER NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
            REFERENCES users (user_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_subject
        FOREIGN KEY (subject_id)
            REFERENCES subject (subject_id)
);

CREATE TABLE question
(
    question_id   SERIAL PRIMARY KEY,
    question_text VARCHAR(255),
    quiz_id       INTEGER,
    question_type VARCHAR(255),
    CONSTRAINT fk_quiz FOREIGN KEY (quiz_id) REFERENCES quiz (quiz_id) ON DELETE CASCADE
);

CREATE TABLE answer
(
    answer_id   SERIAL PRIMARY KEY,
    answer_text TEXT,
    is_correct  BOOLEAN,
    question_id INTEGER NOT NULL,
    CONSTRAINT fk_question
        FOREIGN KEY (question_id)
            REFERENCES question (question_id)
            ON DELETE CASCADE
);

CREATE TABLE attempt
(
    attempt_id   SERIAL PRIMARY KEY,
    start_time   TIMESTAMP,
    finish_time  TIMESTAMP,
    final_result FLOAT,
    user_id      INTEGER NOT NULL,
    quiz_id      INTEGER NOT NULL,
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
            REFERENCES users (user_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_quiz
        FOREIGN KEY (quiz_id)
            REFERENCES quiz (quiz_id)
            ON DELETE CASCADE
);

