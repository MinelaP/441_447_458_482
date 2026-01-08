const { Sequelize } = require('sequelize');

// Kreirajte novu Sequelize instancu, zamijenite vrijednosti sa svojim kredencijalima
const sequelize = new Sequelize('travel_db', 'postgres', 'root', {
  host: 'localhost', // ili gdje vam je hostana baza
  dialect: 'postgres',
    port: 5432, // Standardni port za Postgres
    logging: false
});

// Testiranje konekcije
sequelize.authenticate()
  .then(() => {
    console.log('Uspješno povezan na PostgreSQL bazu!');
  })
  .catch((err) => {
    console.error('Greška pri povezivanju na bazu:', err);
  });

module.exports = sequelize;
