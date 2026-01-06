import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const Home = () => {
    return (
        <div className="home-page">
            <div className="home-buttons">
                <h1>Dobrodošli</h1>
                <p>Izaberite kategoriju:</p>
                <Link to="/travelers">
                    <button>Travelers</button>
                </Link>
                <Link to="/agencies">
                    <button>Agency</button>
                </Link>
                <Link to="/trips">
                    <button>Trips</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
