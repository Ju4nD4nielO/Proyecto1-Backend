CREATE DATABASE IF NOT EXISTS game_tracker;
USE game_tracker;

CREATE TABLE IF NOT EXISTS games (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  genre VARCHAR(100),
  platform VARCHAR(100),
  status ENUM('playing', 'completed', 'plan_to_play', 'dropped', 'on_hold') DEFAULT 'plan_to_play',
  hours_played INT DEFAULT 0,
  image_url VARCHAR(500),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);