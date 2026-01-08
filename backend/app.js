const express = require('express');
const cors = require('cors'); // Dodaj ovo
const sequelize = require('./database');
const tripRoutes = require('./routes/tripRoutes');
const agencyRoutes = require('./routes/agencyRoutes');
const travelerRoutes = require('./routes/travelerRoutes');

const app = express();

app.use(cors()); // OVO JE KLJUČNO - dopušta frontendu da uzme podatke
app.use(express.json());

app.use('/trips', tripRoutes);
app.use('/agencies', agencyRoutes);
app.use('/travelers', travelerRoutes);
/*
sequelize.sync().then(() => {
    app.listen(3000, () => console.log('Server radi na portu 3000 i spojen je na bazu.'));
});
*/
sequelize.sync().then(() => {
app.listen(3001, () => console.log('Server radi na portu 3001 i spojen je na bazu.'));
});