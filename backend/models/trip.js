const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Trip = sequelize.define('Trip', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true // ISPRAVLJENO: bilo je primary_key
    },
    destination: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.DECIMAL },
    image_url: { type: DataTypes.TEXT },
    agencyId: {
        type: DataTypes.INTEGER, // U SQL-u je INTEGER SERIAL
        field: 'agencyId' // Povezuje se sa "agencyId" u bazi
    }
}, { tableName: 'trips', timestamps: false });

module.exports = Trip;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Trips() {
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3000/trips')
            .then(res => res.json())
            .then(data => setTrips(Array.isArray(data) ? data : []))
            .catch(err => console.error(err));
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <button onClick={() => navigate('/')}>← Nazad na početnu</button>
            <h1>Putovanja</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                {trips.map(trip => (
                    <div key={trip.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
                        {/* PRIKAZ SLIKE (Zahtjev br. 2) */}
                        <img
                            src={trip.image_url || 'https://via.placeholder.com/150'}
                            alt={trip.destination}
                            style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                        />
                        <h3>{trip.destination}</h3>
                        <p>{trip.description}</p>
                        <p><strong>Cijena:</strong> {trip.price} KM</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Trips;