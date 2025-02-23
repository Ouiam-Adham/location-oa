import React from 'react'
import { Link } from 'react-router-dom';
import {addReservation} from '../actionjs/actionsLocation'
import { useDispatch, useSelector } from 'react-redux';

export default function Annonces() {
    const locations = useSelector(state=>state.locations)
    const reservations = useSelector(state=>state.reservations)
    const idConnecter = useSelector(state=>state.idConnecter)
    const dispatch = useDispatch();

    function handleReservation(location){
      if (!Array.isArray(reservations)) {
        alert("Reservations is not an array:");
        return;
    }
        const reservation = Array.isArray(reservations)&&reservations.find((reserv)=>{return reserv.idLocation === location.id })
        if (!reservation) {
            dispatch(addReservation(location.id, location.idOwner, idConnecter, location.price))        
            alert('Réservé avec succès');
        } else {
              alert('Vous avez déjà réservé cette location');
        }
          
    }
  

  return (
    <div className="container">
  <h3 className="text-center my-4">Annonces</h3>
  <div className="row">
    {locations.map((location, index) => (
      <div key={index} className="col-md-4" >
        <div className="card mb-4 shadow-sm" >
          {location.images?.[0] && (
            <img src={location.images[0]} className="card-img-top" alt="Location" width="100px" height="300px" style={{ objectFit: 'cover' }} />
          )}
          <div className="card-body">
            <h5 className="card-title">{location.title}</h5>
            <p className="card-text"><strong>Prix:</strong> {location.price} DH</p>
            <div className="d-flex justify-content-between align-items-center">
              <Link to={`/location/${location.id}`} className="btn btn-primary">Consulter</Link>
              {<button 
                className="btn btn-success"
                onClick={()=>handleReservation(location)}>
                Réserver
              </button>}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>)}

