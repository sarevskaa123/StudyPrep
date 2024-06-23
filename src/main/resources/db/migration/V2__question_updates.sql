-- v2 SQL file

-- Drop the old question table and related constraints if they exist (for a clean start)
DROP TABLE IF EXISTS bool_question CASCADE;
DROP TABLE IF EXISTS single_choice_question CASCADE;
DROP TABLE IF EXISTS multiple_choice_question CASCADE;
DROP TABLE IF EXISTS text_question CASCADE;
DROP TABLE IF EXISTS question CASCADE;

-- Create question table (base table for all questions)
CREATE TABLE question
(
    question_id   SERIAL PRIMARY KEY,
    question_text VARCHAR(255),
    quiz_id       INTEGER,
    question_type VARCHAR(255),
    CONSTRAINT fk_quiz FOREIGN KEY (quiz_id) REFERENCES quiz (quiz_id) ON DELETE CASCADE
);

-- Create single choice question table
CREATE TABLE single_choice_question
(
    question_id       INTEGER PRIMARY KEY,
    answer_option1    VARCHAR(255),
    answer_option2    VARCHAR(255),
    answer_option3    VARCHAR(255),
    answer_option4    VARCHAR(255),
    correct_answer    VARCHAR(255),
    CONSTRAINT fk_question FOREIGN KEY (question_id) REFERENCES question (question_id) ON DELETE CASCADE
);

-- Create text question table
CREATE TABLE text_question
(
    question_id    INTEGER PRIMARY KEY,
    correct_answer VARCHAR(255),
    CONSTRAINT fk_question FOREIGN KEY (question_id) REFERENCES question (question_id) ON DELETE CASCADE
);

-- Create multiple choice question table
CREATE TABLE multiple_choice_question
(
    question_id    INTEGER PRIMARY KEY,
    answer_option1 VARCHAR(255),
    answer_option2 VARCHAR(255),
    answer_option3 VARCHAR(255),
    answer_option4 VARCHAR(255),
    is_correct1    BOOLEAN,
    is_correct2    BOOLEAN,
    is_correct3    BOOLEAN,
    is_correct4    BOOLEAN,
    CONSTRAINT fk_question FOREIGN KEY (question_id) REFERENCES question (question_id) ON DELETE CASCADE
);

-- Create boolean question table
CREATE TABLE bool_question
(
    question_id    INTEGER PRIMARY KEY,
    correct_answer BOOLEAN,
    CONSTRAINT fk_question FOREIGN KEY (question_id) REFERENCES question (question_id) ON DELETE CASCADE
);
