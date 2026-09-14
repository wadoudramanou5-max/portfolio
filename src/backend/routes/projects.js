import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from '../db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// ---- Configuration de l'upload d'images ----
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 Mo max
  fileFilter: (req, file, cb) => {
    const allowed = ['.png', '.jpg', '.jpeg', '.webp'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) cb(null, true);
    else cb(new Error("Format d'image non autorisé (png, jpg, jpeg, webp uniquement)"));
  },
});

// ---- GET /api/projects — liste tous les projets ----
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des projets.' });
  }
});

// ---- POST /api/projects — ajoute un projet (avec image) ----
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description, link } = req.body;

    if (!name || !description || !link || !req.file) {
      return res.status(400).json({ error: 'Tous les champs sont requis (nom, description, lien, image).' });
    }

    const image_url = `/uploads/${req.file.filename}`;

    const [result] = await pool.query(
      'INSERT INTO projects (name, description, image_url, link) VALUES (?, ?, ?, ?)',
      [name, description, image_url, link]
    );

    res.status(201).json({ id: result.insertId, name, description, image_url, link });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de l'ajout du projet." });
  }
});

// ---- DELETE /api/projects/:id — supprime un projet ----
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la suppression.' });
  }
});

export default router;
