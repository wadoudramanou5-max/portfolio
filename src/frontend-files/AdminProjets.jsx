import React, { useEffect, useState } from 'react';
import './AdminProjets.css';

// Change cette URL quand tu déploieras le backend en ligne
const API_URL = 'http://https://portfolio-psi-kohl-65.vercel.app/api/projects';

function AdminProjets() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', link: '' });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchProjects = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProjects(data);
    } catch {
      setError('Impossible de charger les projets. Le serveur backend est-il lancé ?');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected || null);
    setPreview(selected ? URL.createObjectURL(selected) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.name || !form.description || !form.link || !file) {
      setError('Remplis tous les champs et choisis une image.');
      return;
    }

    const body = new FormData();
    body.append('name', form.name);
    body.append('description', form.description);
    body.append('link', form.link);
    body.append('image', file);

    setLoading(true);
    try {
      const res = await fetch(API_URL, { method: 'POST', body });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur lors de l'ajout.");
      }
      setForm({ name: '', description: '', link: '' });
      setFile(null);
      setPreview(null);
      setSuccess('Projet ajouté avec succès.');
      fetchProjects();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce projet ?')) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      fetchProjects();
    } catch {
      setError('Erreur lors de la suppression.');
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <header className="admin-header">
          <h1>Gestion des projets</h1>
          <p>Ajoute un nouveau projet ci-dessous — il apparaîtra automatiquement sur ton portfolio.</p>
        </header>

        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nom du projet</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Ex : Beauty-shop"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={form.description}
              onChange={handleChange}
              placeholder="Ce que résout le projet, pour qui, comment."
            />
          </div>

          <div className="form-group">
            <label htmlFor="link">Lien du projet</label>
            <input
              id="link"
              name="link"
              type="url"
              value={form.link}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image (png, jpg, webp — 5 Mo max)</label>
            <input
              id="image"
              name="image"
              type="file"
              accept=".png,.jpg,.jpeg,.webp"
              onChange={handleFileChange}
            />
            {preview && <img className="admin-preview" src={preview} alt="Aperçu" />}
          </div>

          {error && <p className="admin-message admin-error">{error}</p>}
          {success && <p className="admin-message admin-success">{success}</p>}

          <button type="submit" disabled={loading}>
            {loading ? 'Ajout en cours…' : 'Ajouter le projet'}
          </button>
        </form>

        <section className="admin-list">
          <h2>Projets existants ({projects.length})</h2>
          {projects.map((p) => (
            <div className="admin-item" key={p.id}>
              <img src={`http://localhost:4000${p.image_url}`} alt={p.name} />
              <div className="admin-item-info">
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <a href={p.link} target="_blank" rel="noopener noreferrer">{p.link}</a>
              </div>
              <button className="admin-delete" onClick={() => handleDelete(p.id)}>
                Supprimer
              </button>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default AdminProjets;
