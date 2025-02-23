import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useSelector } from 'react-redux';

export default function FormLocation() {
  const idConnecter = localStorage.getItem('idConnecter');
  const [location, setLocation] = useState({
    id: Date.now(),
    title: '', type: '', rooms: '', images: [], adress: '', lat: '', lng: '', price: '', description: '', idOwner: idConnecter
  });
  const [valid, setValid] = useState('');
  const locations = useSelector(state => state.locations);
  function LocationPicker() {
    useMapEvents({
      click(e) {
        setLocation(prev => ({ ...prev, lat: e.latlng.lat, lng: e.latlng.lng }));
      },
    });
    return location.lat && location.lng ? <Marker position={[location.lat, location.lng]} icon={customIcon} /> : null;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!location.title || !location.type || !location.rooms || !location.images.length || !location.adress || !location.lat || !location.lng || !location.price || !location.description) {
      setValid('Tous les champs doivent être remplis.');
      return;
    }

    localStorage.setItem('locations', JSON.stringify([...locations, location]));
  }

  const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [24, 30],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34], 
  });

  return (
    <div className='container mt-4 p-4 shadow-lg bg-white rounded' >
      <h3 className="mb-4 text-center">Formulaire d'Annonce</h3>
      <form onSubmit={handleSubmit}>
        <div className='row g-3'>
          <div className="col-md-6">
            <label className="form-label fw-bold">Title:</label>
            <input type="text" className="form-control" value={location.title} onChange={(e) => setLocation({ ...location, title: e.target.value })} />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">Type:</label>
            <input type="text" className="form-control" value={location.type} onChange={(e) => setLocation({ ...location, type: e.target.value })} />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">Rooms:</label>
            <input type="text" className="form-control" value={location.rooms} onChange={(e) => setLocation({ ...location, rooms: e.target.value })} />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">Adress:</label>
            <input type="text" className="form-control" value={location.adress} onChange={(e) => setLocation({ ...location, adress: e.target.value })} />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">Description:</label>
            <textarea className="form-control" rows="2" value={location.description} onChange={(e) => setLocation({ ...location, description: e.target.value })} />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">Price (DH):</label>
            <input type="number" className="form-control" value={location.price} onChange={(e) => setLocation({ ...location, price: e.target.value })} />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold">Images:</label>
            <input type="file" className="form-control" onChange={(e) => setLocation({ ...location, images: e.target.files })} multiple accept="image/*" />
          </div>
        </div>

        <div className="mt-4">
          <label className="form-label fw-bold">Sélectionner la localisation :</label>
          {location.lat && location.lng && <p className="text-success">Coordonnées: {location.lat}, {location.lng}</p>}

          <MapContainer center={[33.5731, -7.5898]} zoom={6} style={{ height: "300px", width: "100%" }} className="border rounded">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationPicker />
          </MapContainer>
        </div>

        {valid && <p className="text-danger mt-3">{valid}</p>}

        <div className="text-center mt-4">
          <button type="submit" className="btn btn-primary px-4">Ajouter</button>
        </div>
      </form>
    </div>
  );
}
