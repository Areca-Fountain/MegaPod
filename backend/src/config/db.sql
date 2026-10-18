-- MegaPod schema (MySQL 8 / TiDB compatible).
--
-- Local MySQL:  first run   CREATE DATABASE megapod CHARACTER SET utf8mb4;  USE megapod;
-- Hosted MySQL: select the database the provider gave you (for example defaultdb), then run this file.

CREATE TABLE IF NOT EXISTS student (
    email    VARCHAR(255) NOT NULL,
    name     VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,   -- bcrypt hash (60 chars); the old VARCHAR(45) is too short
    PRIMARY KEY (email)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS student_level (
    l_id  INT NOT NULL AUTO_INCREMENT,
    level INT NOT NULL,
    PRIMARY KEY (l_id),
    UNIQUE KEY uq_student_level_level (level)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS student_has_student_level (
    student_email      VARCHAR(255) NOT NULL,
    student_level_l_id INT NOT NULL,
    PRIMARY KEY (student_email, student_level_l_id),
    INDEX idx_shsl_level (student_level_l_id),
    CONSTRAINT fk_shsl_student FOREIGN KEY (student_email) REFERENCES student (email),
    CONSTRAINT fk_shsl_level FOREIGN KEY (student_level_l_id) REFERENCES student_level (l_id)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS wallet (
    id       INT NOT NULL AUTO_INCREMENT,
    w_email  VARCHAR(255) NOT NULL,
    address  VARCHAR(255) NULL DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY uq_wallet_email (w_email),
    CONSTRAINT wallet_email_fk FOREIGN KEY (w_email) REFERENCES student (email)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4;

-- The app inserts level N with student_level.l_id = N, so these rows MUST exist
-- (the original file never created them, so completing a level failed on the foreign key).
INSERT IGNORE INTO student_level (l_id, level) VALUES
    (1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8),(9,9),(10,10);