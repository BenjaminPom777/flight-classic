const db = require('./knex');

// Create an administrator
async function createAdministrator(adminData) {
    try {
        const administrator = await db('administrators').insert(adminData);
        return administrator;
    } catch (error) {
        console.error('Error creating administrator:', error);
        throw error;
    }
}

// Read all administrators
async function getAllAdministrators() {
    try {
        const administrators = await db('administrators').select('*');
        return administrators;
    } catch (error) {
        console.error('Error getting administrators:', error);
        throw error;
    }
}

// Read an administrator by ID
async function getAdministratorById(id) {
    try {
        const administrator = await db('administrators').where({ id }).first();
        return administrator;
    } catch (error) {
        console.error('Error getting administrator by ID:', error);
        throw error;
    }
}

// Update an administrator by ID
async function updateAdministratorById(id, adminData) {
    try {
        const administrator = await db('administrators').where({ id }).update(adminData);
        return administrator;
    } catch (error) {
        console.error('Error updating administrator by ID:', error);
        throw error;
    }
}

// Delete an administrator by ID
async function deleteAdministratorById(id) {
    try {
        const administrator = await db('administrators').where({ id }).del();
        return administrator;
    } catch (error) {
        console.error('Error deleting administrator by ID:', error);
        throw error;
    }
}

module.exports = {
    createAdministrator,
    getAllAdministrators,
    getAdministratorById,
    updateAdministratorById,
    deleteAdministratorById
};