-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema megapod
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema megapod
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `megapod` DEFAULT CHARACTER SET utf8mb3 ;
USE `megapod` ;

-- -----------------------------------------------------
-- Table `megapod`.`student`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `megapod`.`student` (
                                                   `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `password` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`email`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `megapod`.`student_level`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `megapod`.`student_level` (
                                                         `l_id` INT NOT NULL AUTO_INCREMENT,
                                                         `level` INT NOT NULL,
                                                         PRIMARY KEY (`l_id`))
    ENGINE = InnoDB
    AUTO_INCREMENT = 4
    DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `megapod`.`student_has_student_level`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `megapod`.`student_has_student_level` (
                                                                     `student_email` VARCHAR(255) NOT NULL,
    `student_level_l_id` INT NOT NULL,
    PRIMARY KEY (`student_email`, `student_level_l_id`),
    INDEX `fk_student_has_student_level_student_level1_idx` (`student_level_l_id` ASC) VISIBLE,
    INDEX `fk_student_has_student_level_student1_idx` (`student_email` ASC) VISIBLE,
    CONSTRAINT `fk_student_has_student_level_student1`
    FOREIGN KEY (`student_email`)
    REFERENCES `megapod`.`student` (`email`),
    CONSTRAINT `fk_student_has_student_level_student_level1`
    FOREIGN KEY (`student_level_l_id`)
    REFERENCES `megapod`.`student_level` (`l_id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `megapod`.`wallet`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `megapod`.`wallet` (
                                                  `id` INT NOT NULL AUTO_INCREMENT,
                                                  `w_email` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    INDEX `wallet_email_fk` (`w_email` ASC) VISIBLE,
    CONSTRAINT `wallet_email_fk`
    FOREIGN KEY (`w_email`)
    REFERENCES `megapod`.`student` (`email`))
    ENGINE = InnoDB
    AUTO_INCREMENT = 4
    DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
