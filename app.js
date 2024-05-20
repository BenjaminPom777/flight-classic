const express = require('express');
const bodyParser = require('body-parser');

const { getAllFlights, createFlight, getAllFlightsDetails } = require('./db/flights');
const { getCountryById } = require('./db/countries');
const { getAirlineCompanyById } = require('./db/airline_companies');

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.get('/register', (req, res) => {
    res.render('register'); // Serve register form
});

app.post('/register', (req, res) => {
    // Process registration form data
    const { username, email, password } = req.body;
    res.redirect('/');
});


app.get('/', async (req, res) => {
    
    // const flights = await getAllFlights();
    // const flightsDetails = []
    // for (const flight of flights) {
    //     flight.origin_country = await getCountryById(flight.origin_country_id);
    //     flight.destination_country = await getCountryById(flight.destination_country_id);
    //     flight.airline_company = await getAirlineCompanyById(flight.airline_company_id);
    //     flightsDetails.push(flight);
    // }
    const flights = await getAllFlightsDetails();     
    res.render('flights/index', { flights }); // Serve ejs
});


app.get('/flights/:id', (req, res) => {
    console.log(req.params.id);
    res.send(req.params.id);
});

app.get('/api/flights/details', async (req, res) => {
    try {
        const flights = await getAllFlights();
        // const flightsDetails = await Promise.all(flights.map(async flight => {
        //     flight.origin_country = await getCountryById(flight.origin_country_id);
        //     flight.destination_country = await getCountryById(flight.destination_country_id);
        //     flight.airline_company = await getAirlineCompanyById(flight.airline_company_id);
        //     return flight;
        // }));

        const flightsDetails = []
        for (const flight of flights) {
            flight.origin_country = await getCountryById(flight.origin_country_id);
            flight.destination_country = await getCountryById(flight.destination_country_id);
            flight.airline_company = await getAirlineCompanyById(flight.airline_company_id);
            flightsDetails.push(flight);
        }


        res.status(200).json(flightsDetails);
    } catch (error) {
        res.status(500).json({ error: 'Error getting flights' });
    }
});




app.get('/api/flights', async (req, res) => {
    try {
        const flights = await getAllFlights();
        res.status(200).json(flights);
    } catch (error) {
        res.status(500).json({ error: 'Error getting flights' });
    }
});


app.post('/api/flights', async (req, res) => {
    try {
        // Get flight data from request body
        const flightData = req.body;

        // TODO: improve validate flightData
        const flightKeys = [
            "airline_company_id",
            "origin_country_id",
            "destination_country_id",
            "departure_time",
            "landing_time",
            "remaining_tickets"
        ];
        const missingKeys = flightKeys.filter(key => !(key in flightData));

        if (missingKeys.length > 0) {
            res.status(400).json({ error: `Missing keys: ${missingKeys.join(", ")}` });
            return;
        }

        const data = await createFlight(flightData);

        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error creating flight' });
    }
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});