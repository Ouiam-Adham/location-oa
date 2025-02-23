import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addUser } from '../action/actionsLocation';
import { useDispatch } from 'react-redux';

export default function Inscrip() {
  const [user, setUser] = useState({
    id: Date.now(),
    nom: '',
    prenom: '',
    ville: '',
    email: '',
    pass: '',
  });
  const dispatch = useDispatch();

  const [valid, setValid] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!user.nom || !user.prenom || !user.ville || !user.email || !user.pass) {
      setValid('Tous les champs doivent être remplis');
      return;
    }

    dispatch(addUser(user));
    navigate('/annonces');
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4 rounded" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Inscription</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Nom :</label>
            <input
              type="text"
              className="form-control"
              value={user.nom}
              onChange={(e) => setUser({ ...user, nom: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Prénom :</label>
            <input
              type="text"
              className="form-control"
              value={user.prenom}
              onChange={(e) => setUser({ ...user, prenom: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Ville :</label>
            <input
              type="text"
              className="form-control"
              value={user.ville}
              onChange={(e) => setUser({ ...user, ville: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Email :</label>
            <input
              type="email"
              className="form-control"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Mot de passe :</label>
            <input
              type="password"
              className="form-control"
              value={user.pass}
              onChange={(e) => setUser({ ...user, pass: e.target.value })}
            />
          </div>

          {valid && <p className="text-danger text-center">{valid}</p>}

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              S'inscrire
            </button>
          </div>
        </form>

        <div className="text-center mt-3">
          <Link to="/Auth" className="text-decoration-none">
            J'ai déjà un compte
          </Link>
        </div>
      </div>
    </div>
  );
}
