CREATE DATABASE IF NOT EXISTS series_tracker;
USE series_tracker;

CREATE TABLE IF NOT EXISTS series (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  genre VARCHAR(100),
  status ENUM('watching', 'completed', 'plan_to_watch', 'dropped') DEFAULT 'plan_to_watch',
  episodes_watched INT DEFAULT 0,
  total_episodes INT,
  image_url VARCHAR(500),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);