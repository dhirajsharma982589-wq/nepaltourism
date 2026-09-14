-- Optional reference schema for MySQL deployments.
-- Spring JPA manages the same tables through application.properties.
CREATE TABLE IF NOT EXISTS roles (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(40) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS regions (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL UNIQUE,
  description TEXT,
  image_url VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS categories (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL UNIQUE,
  description TEXT
);

CREATE TABLE IF NOT EXISTS users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(180) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  country VARCHAR(80),
  preferred_travel_style VARCHAR(40),
  role VARCHAR(40) NOT NULL DEFAULT 'USER'
);

CREATE TABLE IF NOT EXISTS destinations (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  region_id BIGINT,
  category_id BIGINT,
  name VARCHAR(180) NOT NULL,
  location VARCHAR(180),
  description TEXT,
  difficulty VARCHAR(40),
  budget VARCHAR(40),
  recommended_season VARCHAR(80),
  rating DECIMAL(3,2),
  FOREIGN KEY (region_id) REFERENCES regions(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE IF NOT EXISTS destination_images (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  destination_id BIGINT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  sort_order INT DEFAULT 0,
  FOREIGN KEY (destination_id) REFERENCES destinations(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS experiences (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  destination_id BIGINT,
  name VARCHAR(180) NOT NULL,
  description TEXT,
  location VARCHAR(180),
  difficulty VARCHAR(40),
  duration VARCHAR(80),
  estimated_cost VARCHAR(100),
  best_season VARCHAR(100),
  safety_information TEXT,
  FOREIGN KEY (destination_id) REFERENCES destinations(id)
);

CREATE TABLE IF NOT EXISTS experience_locations (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  experience_id BIGINT NOT NULL,
  name VARCHAR(180) NOT NULL,
  location VARCHAR(180),
  region VARCHAR(180),
  description TEXT,
  image_url VARCHAR(700),
  FOREIGN KEY (experience_id) REFERENCES experiences(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS favorites (
  user_id BIGINT NOT NULL,
  destination_id BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, destination_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (destination_id) REFERENCES destinations(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS trips (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  name VARCHAR(180) NOT NULL,
  start_date DATE,
  end_date DATE,
  budget VARCHAR(100),
  travel_style VARCHAR(40),
  interests VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS trip_items (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  trip_id BIGINT NOT NULL,
  destination_id BIGINT,
  day_number INT NOT NULL,
  activities TEXT,
  FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
  FOREIGN KEY (destination_id) REFERENCES destinations(id)
);

CREATE TABLE IF NOT EXISTS reviews (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  destination_id BIGINT NOT NULL,
  rating INT NOT NULL,
  review_text TEXT NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY one_review_per_user_destination (user_id, destination_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (destination_id) REFERENCES destinations(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS travel_guides (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  section VARCHAR(120) NOT NULL,
  title VARCHAR(180) NOT NULL,
  content TEXT NOT NULL,
  verification_note VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS festivals (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  description TEXT NOT NULL,
  approximate_season VARCHAR(120) NOT NULL,
  cultural_importance TEXT
);

CREATE TABLE IF NOT EXISTS foods (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL,
  description TEXT NOT NULL,
  region VARCHAR(120),
  dietary_information VARCHAR(120),
  cultural_background TEXT,
  image_url VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS emergency_contacts (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(150) NOT NULL,
  phone VARCHAR(60) NOT NULL,
  description VARCHAR(255),
  verification_note VARCHAR(255)
);
