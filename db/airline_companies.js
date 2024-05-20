const db = require('./knex');

// Create an airline company
async function createAirlineCompany(airlineCompanyData) {
    try {
        const airlineCompany = await db('airline_companies').insert(airlineCompanyData);
        return airlineCompany;
    } catch (error) {
        console.error('Error creating airline company:', error);
        throw error;
    }
}

// Read all airline companies
async function getAllAirlineCompanies() {
    try {
        const airlineCompanies = await db('airline_companies').select('*');
        return airlineCompanies;
    } catch (error) {
        console.error('Error getting airline companies:', error);
        throw error;
    }
}

// Read an airline company by ID
async function getAirlineCompanyById(id) {
    try {
        const airlineCompany = await db('airline_companies').where({ id }).first();
        return airlineCompany;
    } catch (error) {
        console.error('Error getting airline company by ID:', error);
        throw error;
    }
}

// Update an airline company by ID
async function updateAirlineCompanyById(id, airlineCompanyData) {
    try {
        const airlineCompany = await db('airline_companies').where({ id }).update(airlineCompanyData);
        return airlineCompany;
    } catch (error) {
        console.error('Error updating airline company by ID:', error);
        throw error;
    }
}

// Delete an airline company by ID
async function deleteAirlineCompanyById(id) {
    try {
        const airlineCompany = await db('airline_companies').where({ id }).del();
        return airlineCompany;
    } catch (error) {
        console.error('Error deleting airline company by ID:', error);
        throw error;
    }
}

module.exports = {
    createAirlineCompany,
    getAllAirlineCompanies,
    getAirlineCompanyById,
    updateAirlineCompanyById,
    deleteAirlineCompanyById
};