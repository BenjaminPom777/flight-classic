const db = require('./knex');

// Create a flight
async function createFlight(flightData) {
    try {
        const flight = await db('flights').insert(flightData);
        return flight;
    } catch (error) {
        console.error('Error creating flight:', error);
        throw error;
    }
}

// Read all flights
async function getAllFlights() {
    try {
        const flights = await db('flights').select('*');
        return flights;
    } catch (error) {
        console.error('Error getting flights:', error);
        throw error;
    }
}

// Read a flight by ID
async function getFlightById(id) {
    try {
        const flight = await db('flights').where({ id }).first();
        return flight;
    } catch (error) {
        console.error('Error getting flight by ID:', error);
        throw error;
    }
}

// Update a flight by ID
async function updateFlightById(id, flightData) {
    try {
        const flight = await db('flights').where({ id }).update(flightData);
        return flight;
    } catch (error) {
        console.error('Error updating flight by ID:', error);
        throw error;
    }
}

// Delete a flight by ID
async function deleteFlightById(id) {
    try {
        const flight = await db('flights').where({ id }).del();
        return flight;
    } catch (error) {
        console.error('Error deleting flight by ID:', error);
        throw error;
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlightById,
    updateFlightById,
    deleteFlightById
};