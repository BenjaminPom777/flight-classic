const db = require('./knex');

// Create a customer
async function createCustomer(customerData) {
    try {
        const customer = await db('customers').insert(customerData);
        return customer;
    } catch (error) {
        console.error('Error creating customer:', error);
        throw error;
    }
}

// Read all customers
async function getAllCustomers() {
    try {
        const customers = await db('customers').select('*');
        return customers;
    } catch (error) {
        console.error('Error getting customers:', error);
        throw error;
    }
}

// Read a customer by ID
async function getCustomerById(id) {
    try {
        const customer = await db('customers').where({ id }).first();
        return customer;
    } catch (error) {
        console.error('Error getting customer by ID:', error);
        throw error;
    }
}

// Update a customer by ID
async function updateCustomerById(id, customerData) {
    try {
        const customer = await db('customers').where({ id }).update(customerData);
        return customer;
    } catch (error) {
        console.error('Error updating customer by ID:', error);
        throw error;
    }
}

// Delete a customer by ID
async function deleteCustomerById(id) {
    try {
        const customer = await db('customers').where({ id }).del();
        return customer;
    } catch (error) {
        console.error('Error deleting customer by ID:', error);
        throw error;
    }
}

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomerById,
    deleteCustomerById
};