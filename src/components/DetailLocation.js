import React from 'react';
import { useParams } from 'react-router-dom';
import { addReservation } from '../actionjs/actionsLocation';
import { useDispatch, useSelector } from 'react-redux';

export default function DetailLocation() {
    const locations = useSelector(state => state.locations);
    const reservations = useSelector(state => state.reservations);

    const { id } = useParams();

    const idConnecter = useSelector(state => state.idConnecter);
    const dispatch = useDispatch();
    const location = locations.find(location => location.id == id);
    if (!location) {
        return <div className="container mt-5"><p className="text-danger">Annonce non trouvée.</p></div>;
    }

    
    function handleReservation(loca){
    
        const locationFound = locations.find((loc)=>{return loc.id ===loca.id})
        const reservation = reservations.find((reserv)=>{return reserv.idLocation === locationFound.id })
        if (!reservation) {
            dispatch(addReservation(location.id, location.idOwner, idConnecter, location.price))        
            alert('Réservé avec succès');
        } else {
              alert('Vous avez déjà réservé cette location');
        }
          
    }

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h2 className="card-title text-center">{location.title}</h2>
                
                <div className="row">
                    <div className="col-md-6">
                        <p><strong>Type :</strong> {location.type}</p>
                        <p><strong>Adresse :</strong> {location.adress}</p>
                        <p><strong>Nombre de chambres :</strong> {location.rooms}</p>
                        <p><strong>Description :</strong> {location.description}</p>
                        <p><strong>Prix :</strong> {location.price} DH</p>
                        <button 
                            className="btn btn-primary"
                            onClick={()=>handleReservation(location)}
                        >
                            Réserver
                        </button>
                    </div>

                    <div className="col-md-6">
                        <div className="d-flex flex-wrap">
                            {location.images.map((img, index) => (
                                <img key={index} src={img} className="img-fluid m-1" style={{ width: "350px", height: "200px", objectFit: "cover" }} alt={`Image ${index}`} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
