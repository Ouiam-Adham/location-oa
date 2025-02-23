import React from 'react'
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import L from "leaflet";

export default function Map() {
    const toutLocations = useSelector(state=>state.locations);
    const locations = toutLocations.filter((loc)=>{return loc.available===true})
    const navigate = useNavigate();

    const customIcon = new L.Icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconSize: [24, 30],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34], 
    });

    return (
        <div className="container mt-2">
            <div className="row">
                <div className="col-12">
                    <h3 className='text-center'>Explorer les Locations Disponibles </h3>
                    <MapContainer center={[34.1931, -6.5898]} zoom={10} style={{ height: "550px", width: "100%" }} className="rounded shadow">
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                    {
                            locations.map((location) => {return <Marker key={location.id} position={[parseFloat(location.lat), parseFloat(location.lng)]} icon={customIcon}
                                    eventHandlers={{ click: () => navigate(`/location/${location.id}`) }} />})
                        }
                    </MapContainer>
                </div>
            </div>
        </div>
    )
}
