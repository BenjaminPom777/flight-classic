const db = require('./knex');

// Create a ticket
async function createTicket(ticketData) {
    try {
        const ticket = await db('tickets').insert(ticketData);
        return ticket;
    } catch (error) {
        console.error('Error creating ticket:', error);
        throw error;
    }
}

// Read all tickets
async function getAllTickets() {
    try {
        const tickets = await db('tickets').select('*');
        return tickets;
    } catch (error) {
        console.error('Error getting tickets:', error);
        throw error;
    }
}

// Read a ticket by ID
async function getTicketById(id) {
    try {
        const ticket = await db('tickets').where({ id }).first();
        return ticket;
    } catch (error) {
        console.error('Error getting ticket by ID:', error);
        throw error;
    }
}

// Update a ticket by ID
async function updateTicketById(id, ticketData) {
    try {
        const ticket = await db('tickets').where({ id }).update(ticketData);
        return ticket;
    } catch (error) {
        console.error('Error updating ticket by ID:', error);
        throw error;
    }
}

// Delete a ticket by ID
async function deleteTicketById(id) {
    try {
        const ticket = await db('tickets').where({ id }).del();
        return ticket;
    } catch (error) {
        console.error('Error deleting ticket by ID:', error);
        throw error;
    }
}

module.exports = {
    createTicket,
    getAllTickets,
    getTicketById,
    updateTicketById,
    deleteTicketById
};