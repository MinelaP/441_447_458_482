const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Agency = sequelize.define('Agency', {
    id: {
        type: DataTypes.INTEGER, // U SQL-u je SERIAL, pa je ovdje INTEGER
        primaryKey: true,        // ISPRAVLJENO: bilo je primary_key
        autoIncrement: true
    },
    name: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING }
}, { tableName: 'agencies', timestamps: false });

module.exports = Agency;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Agencies() {
    const [agencies, setAgencies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3000/agencies')
            .then(res => res.json())
            .then(data => setAgencies(Array.isArray(data) ? data : []));
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <button onClick={() => navigate('/')}>← Nazad na početnu</button>
            <h1>Agencije</h1>
            <ul>
                {agencies.map(a => (
                    <li key={a.id}>{a.name} - {a.location}</li>
                ))}
            </ul>
        </div>
    );
}

export default Agencies;