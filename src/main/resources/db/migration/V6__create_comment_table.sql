CREATE TABLE if not exists comment
(
    comment_id   SERIAL PRIMARY KEY,
    comment_text VARCHAR(255),
    quiz_id      INTEGER,
    user_id INTEGER,
    CONSTRAINT fk_quiz FOREIGN KEY (quiz_id) REFERENCES quiz (quiz_id) ON DELETE CASCADE,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);