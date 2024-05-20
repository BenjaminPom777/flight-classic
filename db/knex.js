const knex = require('knex');

const db = knex({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'admin1234',
        database: 'flight_system'
    }
});

module.exports = db;