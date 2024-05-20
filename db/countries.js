const db = require('./knex');

// Create a country
async function createCountry(countryData) {
    try {
        const country = await db('countries').insert(countryData);
        return country;
    } catch (error) {
        console.error('Error creating country:', error);
        throw error;
    }
}

// Read all countries
async function getAllCountries() {
    try {
        const countries = await db('countries').select('*');
        return countries;
    } catch (error) {
        console.error('Error getting countries:', error);
        throw error;
    }
}

// Read a country by ID
async function getCountryById(id) {
    try {
        const country = await db('countries').where({ id }).first();
        return country;
    } catch (error) {
        console.error('Error getting country by ID:', error);
        throw error;
    }
}

// Update a country by ID
async function updateCountryById(id, countryData) {
    try {
        const country = await db('countries').where({ id }).update(countryData);
        return country;
    } catch (error) {
        console.error('Error updating country by ID:', error);
        throw error;
    }
}

// Delete a country by ID
async function deleteCountryById(id) {
    try {
        const country = await db('countries').where({ id }).del();
        return country;
    } catch (error) {
        console.error('Error deleting country by ID:', error);
        throw error;
    }
}

module.exports = {
    createCountry,
    getAllCountries,
    getCountryById,
    updateCountryById,
    deleteCountryById
};