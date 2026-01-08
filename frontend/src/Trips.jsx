import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Trips() {
    const [trips, setTrips] = useState([]);
    const [newTrip, setNewTrip] = useState({
        id: '',
        destination: '',
        description: '',
        price: '',
        image_url: ''
    });
    const [editingTrip, setEditingTrip] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTrips();
    }, []);

    const fetchTrips = () => {
        fetch('http://localhost:3000/trips')
            .then((res) => res.json())
            .then((data) => setTrips(Array.isArray(data) ? data : []))
            .catch((err) => console.error(err));
    };

    const addTrip = (event) => {
        event.preventDefault();
        fetch('http://localhost:3000/trips', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTrip),
        })
            .then((res) => res.json())
            .then(() => {
                setNewTrip({
                    id: '',
                    destination: '',
                    description: '',
                    price: '',
                    image_url: ''
                });
                fetchTrips();
            })
            .catch((err) => console.error(err));
    };

    const startEditing = (trip) => {
        setEditingTrip(trip);
    };

    const updateTrip = (event) => {
        event.preventDefault();
        if (!editingTrip) return;

        fetch(`http://localhost:3000/trips/${editingTrip.id}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editingTrip),
            })
            .then((res) => res.json())
            .then(() => {
                setEditingTrip(null);
                fetchTrips();
            })
            .catch((err) => console.error(err));
    };

    const deleteTrip = (id) => {
        fetch(`http://localhost:3000/trips/${id}`,
            {
                method: 'DELETE',
            })
            .then((res) => res.json())
            .then(() => fetchTrips())
            .catch((err) => console.error(err));
    };

    return (
        <div style={styles.pageContainer}>
            <button onClick={() => navigate('/')}>← Nazad na početnu</button>
            <h1 style={styles.title}>Putovanja</h1>

            <form onSubmit={addTrip} style={styles.form}>
                <h3>Dodaj novo putovanje</h3>
                <input
                    style={styles.input}
                    type="text"
                    placeholder="ID"
                    value={newTrip.id}
                    onChange={(e) => setNewTrip({ ...newTrip, id: e.target.value })}
                    required
                />
                <input
                    style={styles.input}
                    type="text"
                    placeholder="Destination"
                    value={newTrip.destination}
                    onChange={(e) => setNewTrip({ ...newTrip, destination: e.target.value })}
                    required
                />
                <input
                    style={styles.input}
                    type="text"
                    placeholder="Description"
                    value={newTrip.description}
                    onChange={(e) => setNewTrip({ ...newTrip, description: e.target.value })}
                    required
                />
                <input
                    style={styles.input}
                    type="number"
                    placeholder="Price"
                    value={newTrip.price}
                    onChange={(e) => setNewTrip({ ...newTrip, price: e.target.value })}
                    required
                />
                <input
                    style={styles.input}
                    type="url"
                    placeholder="Image URL"
                    value={newTrip.image_url}
                    onChange={(e) => setNewTrip({ ...newTrip, image_url: e.target.value })}
                />
                <button style={styles.button} type="submit">Dodaj</button>
            </form>

            {editingTrip && (
                <form onSubmit={updateTrip} style={styles.form}>
                    <h3>Ažuriraj putovanje</h3>
                    <p>ID: {editingTrip.id}</p>
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Destination"
                        value={editingTrip.destination}
                        onChange={(e) => setEditingTrip({ ...editingTrip, destination: e.target.value })}
                        required
                    />
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Description"
                        value={editingTrip.description}
                        onChange={(e) => setEditingTrip({ ...editingTrip, description: e.target.value })}
                        required
                    />
                    <input
                        style={styles.input}
                        type="number"
                        placeholder="Price"
                        value={editingTrip.price}
                        onChange={(e) => setEditingTrip({ ...editingTrip, price: e.target.value })}
                        required
                    />
                    <input
                        style={styles.input}
                        type="url"
                        placeholder="Image URL"
                        value={editingTrip.image_url || ''}
                        onChange={(e) => setEditingTrip({ ...editingTrip, image_url: e.target.value })}
                    />
                    <button style={styles.button} type="submit">Sačuvaj</button>
                    <button style={styles.buttonCancel} type="button" onClick={() => setEditingTrip(null)}>Odustani</button>
                </form>
            )}

            <div>
                <h3 style={styles.subTitle}>Lista putovanja</h3>
                {trips.length === 0 ? (
                    <p>Nema upisanih putovanja</p>
                ) : (
                    <table style={styles.table}>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Destinacija</th>
                            <th>Opis</th>
                            <th>Cijena (KM)</th>
                            <th>Slika</th>
                            <th>Akcije</th>
                        </tr>
                        </thead>
                        <tbody>
                        {trips.map((trip) => (
                            <tr key={trip.id}>
                                <td>{trip.id}</td>
                                <td>{trip.destination}</td>
                                <td>{trip.description}</td>
                                <td>{trip.price}</td>
                                <td>
                                    <img
                                        src={trip.image_url || 'https://via.placeholder.com/120'}
                                        alt={trip.destination}
                                        style={styles.thumbnail}
                                    />
                                </td>
                                <td>
                                    <button style={styles.buttonSmall} onClick={() => startEditing(trip)}>Edit</button>
                                    <button style={styles.buttonDelete} onClick={() => deleteTrip(trip.id)}>Obriši</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

const styles = {
    pageContainer: {
        padding: '20px',
        backgroundColor: '#e0f2f1',
        minHeight: '100vh'
    },
    title: {
        color: '#00695c'
    },
    subTitle: {
        color: '#004d40'
    },
    form: {
        backgroundColor: '#ffffff',
        padding: '10px',
        marginBottom: '20px',
        borderRadius: '8px'
    },
    input: {
        display: 'block',
        marginBottom: '10px',
        padding: '8px',
        width: '260px',
    },
    button: {
        backgroundColor: '#20b2aa',
        color: '#fff',
        border: 'none',
        padding: '8px 16px',
        marginRight: '10px',
        cursor: 'pointer',
        borderRadius: '4px'
    },
    buttonCancel: {
        backgroundColor: '#c62828',
        color: '#fff',
        border: 'none',
        padding: '8px 16px',
        cursor: 'pointer',
        borderRadius: '4px'
    },
    buttonSmall: {
        backgroundColor: '#20b2aa',
        color: '#fff',
        border: 'none',
        padding: '5px 10px',
        marginRight: '5px',
        cursor: 'pointer',
        borderRadius: '4px'
    },
    buttonDelete: {
        backgroundColor: '#c62828',
        color: '#fff',
        border: 'none',
        padding: '5px 10px',
        cursor: 'pointer',
        borderRadius: '4px'
    },
    table: {
        borderCollapse: 'collapse',
        width: '100%'
    },
    thumbnail: {
        width: '120px',
        height: '80px',
        objectFit: 'cover',
        borderRadius: '6px'
    }
};

export default Trips;