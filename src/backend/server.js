import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import projectsRouter from './routes/projects.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Sert les images uploadées de façon statique (http://localhost:4000/uploads/...)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/projects', projectsRouter);

// Gestion centralisée des erreurs (ex: fichier trop lourd, format refusé)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(400).json({ error: err.message || 'Une erreur est survenue.' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Serveur backend lancé sur http://localhost:${PORT}`);
});
