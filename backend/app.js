// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Uvoz našeg sequelize objekta
const sequelize = require('./database');

// Uvoz modela (da se definicije "učitaju")
const Traveler = require('./models/traveler');
const Trip = require('./models/trip');
const Agency = require('./models/agency');

// Uvoz ruta
const travelerRoutes = require('./routes/travelerRoutes');
const tripRoutes = require('./routes/tripRoutes');
const agencyRoutes = require('./routes/agencyRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rute
app.use('/travelers', travelerRoutes);
app.use('/trips', tripRoutes);
app.use('/agencies', agencyRoutes);

// Sinhronizacija modela sa bazom (ovo kreira tabele ako ne postoje)
sequelize.sync()
    .then(() => {
        console.log('Modeli sinhronizirani sa bazom podataka.');
        // Tek nakon što je sync gotov, startujemo server
        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Greška pri sinhronizaciji modela:', err);
    });
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Travelers from './Travelers';
import Agencies from './Agencies'; // Novi fajl
import Trips from './Trips';       // Novi fajl

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/travelers" element={<Travelers />} />
                <Route path="/agencies" element={<Agencies />} />
                <Route path="/trips" element={<Trips />} />
            </Routes>
        </Router>
    );
}
export default App;