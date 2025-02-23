import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

export default function TableauAdmin() {
    const reservations = useSelector(state => state.reservations);
    const accepted = reservations.filter((reserv) => reserv.accepted === true);
    const locations = useSelector(state => state.locations);
    const taux = Math.floor(accepted.length / locations.length);

    const revenu = reservations.reduce((somme, reserv) => somme + (Number(reserv.price) || 0), 0);

    return (
        <div className="container mt-4">
            <div className="card shadow p-4">
                <h3 className="text-primary mb-4">📊 Statistiques Générales :</h3>
                <h4 className="text-secondary">📈 Taux d'occupation : <span className="fw-bold">{taux * 100}%</span></h4>
                <h4 className="text-success">💰 Revenus : <span className="fw-bold">{revenu} DH</span></h4>

                
            </div>
        </div>
    )
}
