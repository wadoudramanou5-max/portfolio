CREATE DATABASE IF NOT EXISTS portfolio_wadoud;
USE portfolio_wadoud;

CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  link VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optionnel : réinsère tes deux projets existants (Beauty-shop, BlogSphere)
-- une fois que tu auras uploadé leurs captures d'écran via la page admin,
-- tu peux ignorer ce bloc et les rajouter directement depuis le formulaire.
