import React, { useState, useEffect } from 'react';

/*
* Za Agencies.jsx i Trips.jsx možete gotovo identičnu strukturu koristiti kao u Travelers.jsx – samo prilagodite polja i rute (/agencies, /agencies/:id, i /trips, /trips/:id).

Primjer:

U Agencies.jsx, polja su id, name, location.
U Trips.jsx, polja su id, destination, duration, travelerId.
* */

function Travelers() {
    const [travelers, setTravelers] = useState([]);
    const [newTraveler, setNewTraveler] = useState({ id: '', name: '', age: '' });
    const [editingTraveler, setEditingTraveler] = useState(null); // za edit form

    // Fetch-ujemo listu travelers prilikom mount-a
    useEffect(() => {
        fetchTravelers();
    }, []);

    const fetchTravelers = () => {
        fetch('http://localhost:3000/travelers') // ili samo '/travelers' ako imate proxy
            .then((res) => res.json())
            .then((data) => setTravelers(data))
            .catch((err) => console.error('Error:', err));
    };

    // Dodavanje novog traveler-a
    const addTraveler = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/travelers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTraveler),
        })
            .then((res) => res.json())
            .then(() => {
                setNewTraveler({ id: '', name: '', age: '' });
                fetchTravelers(); // ponovno učitaj listu
            })
            .catch((err) => console.error('Error:', err));
    };

    // Otvaramo formu za edit
    const startEditing = (traveler) => {
        setEditingTraveler(traveler);
    };

    // Ažuriranje traveler-a
    const updateTraveler = (e) => {
        e.preventDefault();
        if (!editingTraveler) return;

        fetch(`http://localhost:3000/travelers/${editingTraveler.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editingTraveler),
        })
            .then((res) => res.json())
            .then(() => {
                setEditingTraveler(null);
                fetchTravelers();
            })
            .catch((err) => console.error('Error:', err));
    };

    // Brisanje
    const deleteTraveler = (id) => {
        fetch(`http://localhost:3000/travelers/${id}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then(() => {
                fetchTravelers();
            })
            .catch((err) => console.error('Error:', err));
    };

    return (
        <div style={styles.pageContainer}>
            <h1 style={styles.title}>Travelers</h1>

            {/* Forma za dodavanje novog traveler-a */}
            <form onSubmit={addTraveler} style={styles.form}>
                <h3>Dodaj novog Traveler-a</h3>
                <input
                    style={styles.input}
                    type="text"
                    placeholder="ID"
                    value={newTraveler.id}
                    onChange={(e) => setNewTraveler({ ...newTraveler, id: e.target.value })}
                    required
                />
                <input
                    style={styles.input}
                    type="text"
                    placeholder="Name"
                    value={newTraveler.name}
                    onChange={(e) => setNewTraveler({ ...newTraveler, name: e.target.value })}
                    required
                />
                <input
                    style={styles.input}
                    type="number"
                    placeholder="Age"
                    value={newTraveler.age}
                    onChange={(e) => setNewTraveler({ ...newTraveler, age: e.target.value })}
                    required
                />
                <button style={styles.button} type="submit">Dodaj</button>
            </form>

            {/* Forma za edit ako editingTraveler != null */}
            {editingTraveler && (
                <form onSubmit={updateTraveler} style={styles.form}>
                    <h3>Ažuriraj Traveler-a</h3>
                    <p>ID: {editingTraveler.id}</p>
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Name"
                        value={editingTraveler.name}
                        onChange={(e) => setEditingTraveler({ ...editingTraveler, name: e.target.value })}
                        required
                    />
                    <input
                        style={styles.input}
                        type="number"
                        placeholder="Age"
                        value={editingTraveler.age}
                        onChange={(e) => setEditingTraveler({ ...editingTraveler, age: e.target.value })}
                        required
                    />
                    <button style={styles.button} type="submit">Sačuvaj</button>
                    <button style={styles.buttonCancel} type="button" onClick={() => setEditingTraveler(null)}>Odustani</button>
                </form>
            )}

            {/* Lista svih travelers */}
            <div>
                <h3 style={styles.subTitle}>Lista Traveler-a</h3>
                {travelers.length === 0 ? (
                    <p>Nema upisanih traveler-a</p>
                ) : (
                    <table style={styles.table}>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ime</th>
                            <th>Godine</th>
                            <th>Akcije</th>
                        </tr>
                        </thead>
                        <tbody>
                        {travelers.map((trav) => (
                            <tr key={trav.id}>
                                <td>{trav.id}</td>
                                <td>{trav.name}</td>
                                <td>{trav.age}</td>
                                <td>
                                    <button style={styles.buttonSmall} onClick={() => startEditing(trav)}>Edit</button>
                                    <button style={styles.buttonDelete} onClick={() => deleteTraveler(trav.id)}>Obriši</button>
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

// Minimalni CSS-in-JS stilovi u jednoj konstanti
const styles = {
    pageContainer: {
        padding: '20px',
        backgroundColor: '#e0f2f1', // svijetlo tirkizna pozadina
        minHeight: '100vh'
    },
    title: {
        color: '#00695c' // tamnija zelena
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
        width: '200px',
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
};

export default Travelers;
