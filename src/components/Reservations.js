import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { acceptReservation } from '../actionjs/actionsLocation';
import { Link } from 'react-router-dom';

export default function Reservations() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const locations = useSelector(state => state.locations);
    const reservations = useSelector(state => state.reservations);

    const userReservations = Array.isArray(reservations)&& reservations.filter(reserv => reserv.idOwner == id) ;

    return (
        <div className="container mt-4">
            <h2 className="text-center text-primary mb-4">📌 Mes Réservations</h2>

            {userReservations?.length === 0 ? (
                <p className="text-danger text-center fw-bold">🚫 Aucune réservation pour le moment.</p>
            ) : (
                <div className="row">
                    {userReservations.map((reserv) => {
                        const loca = locations.find(l => l.id === reserv.idLocation);
                        if (!loca) return null;

                        return (
                            <div key={reserv.id} className="col-md-6 mb-4">
                                <div className="card shadow p-3">
                                    <h3 className="text-secondary">{loca.title}</h3>
                                    <p className="text-muted">{loca.type}</p>
                                    <p className="fw-bold text-success">{loca.price} DH</p>
                                    <p>
                                        <Link to={`/location/${loca.id}`}>
                                            <button className="btn btn-info w-100">📄 Détails</button>
                                        </Link>
                                    </p>
                                    <p>
                                        {reservations.accepted?<button
                                            className="btn btn-success w-100"
                                            onClick={() => {
                                                dispatch(acceptReservation(reserv.id));
                                                alert('✅ Réservation acceptée!');
                                            }}
                                        >
                                            ✅ Accepter la réservation
                                        </button>:<button className="btn btn-success w-100 disabled"> ✅ Accepted</button>}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
