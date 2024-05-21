const express = require('express');
const bodyParser = require('body-parser');

const { getAllFlights, createFlight, getAllFlightsDetails, getAllFlightsDetailsById, updateFlightById } = require('./db/flights');
const { getCountryById, getAllCountries } = require('./db/countries');
const { getAirlineCompanyById } = require('./db/airline_companies');
const { htmlDatetimeLocalToMysqlDatetime, mysqlDatetimeToHtmlDatetimeLocal } = require('./helpers/helpers')

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

// app.get('/register', (req, res) => {
//     res.render('register'); // Serve register form
// });

// app.post('/register', (req, res) => {
//     // Process registration form data
//     const { username, email, password } = req.body;
//     res.redirect('/');
// });


app.get('/', async (req, res) => {
    const flights = await getAllFlightsDetails();    
    res.render('index', { flights }); // Serve ejs
});


app.get('/flights/:id/edit', async (req, res) => {
    const id = req.params.id
    const flight = await getAllFlightsDetailsById(id);

    flight.departure_time = mysqlDatetimeToHtmlDatetimeLocal(flight.departure_time)
    flight.landing_time = mysqlDatetimeToHtmlDatetimeLocal(flight.landing_time)
    
    const countries = await getAllCountries();    
    res.render('editFlight', { flight, countries }); // Serve ejs
});

app.post('/flights/:id/submit', async (req, res) => {
    try {        
        const flightData = req.body;
        flightData.departure_time = htmlDatetimeLocalToMysqlDatetime(flightData.departure_time)
        flightData.landing_time = htmlDatetimeLocalToMysqlDatetime(flightData.landing_time)
        // VALIDATE FORM DATA    
        const result = await updateFlightById(req.params.id, flightData)
        console.log(result)
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ error: 'Error updating flight' });
    }
})


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