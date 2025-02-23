import React from 'react'
import { deleteLocation, blockLocation, unblockLocation } from '../actionjs/actionsLocation'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function AdminLocations() {
    const locations = useSelector(state => state.locations)
    const dispatch = useDispatch();
    const sortedLocations = [...locations].sort((a, b) => a.id - b.id);
    return (
        <div className="container mt-4">
            <h2 className="text-center text-primary mb-4">📌 Gestion des Annonces des Locations</h2>
            <div className="row">
                {sortedLocations.length !==0 ?sortedLocations.map((location, index) => (
                  
                    <div key={index} className="col-md-6 mb-4">
                        <div className="card shadow p-3">
                            <h3 className="text-secondary">{location.title}</h3>
                            <p className="fw-bold text-success">{location.price} DH</p>
                            <p>
                                <Link to={`/location/${location.id}`}>
                                    <button className="btn btn-info w-100">📄 Détails Annonce</button>
                                </Link>
                            </p>
                            <p>
                                {!location.blocked?<button className="btn btn-warning w-100" onClick={() => dispatch(blockLocation(location.id))}>
                                    🚫 Bloquer Annonce
                                </button>:<button className="btn btn-warning w-100" onClick={() => dispatch(unblockLocation(location.id))}>
                                🔓 Debloquer Annonce
                                </button>}
                            </p>
                            <p>
                                <button className="btn btn-danger w-100" onClick={() => {dispatch(deleteLocation(location.id)); alert('Supprime avec succes')}}>
                                    ❌ Supprimer Annonce
                                </button>
                            </p>
                        </div>
                    </div>
                )):<p className="text-danger text-center mt-4 fw-bold">🚫 Pas de locations pour le moment.</p>
}
            </div>
        </div>
    )
}
