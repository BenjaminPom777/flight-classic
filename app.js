require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const cors = require('cors');


const { getAllFlights, createFlight, getAllFlightsDetails, getAllFlightsDetailsById, updateFlightById } = require('./db/flights');
const { getCountryById, getAllCountries } = require('./db/countries');
const { getAirlineCompanyById } = require('./db/airline_companies');
const { htmlDatetimeLocalToMysqlDatetime, mysqlDatetimeToHtmlDatetimeLocal } = require('./helpers/helpers');
const { createCustomer } = require('./db/customers');

const SECRET = process.env.SECRET

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:5174' , credentials: true}));

app.use(express.static('public'))

const authUser = (req, res, next) => {
    const jwtToken = req.cookies?.token
    if (!jwtToken) {
        return res.redirect('/register')
    }
    try {        
        jwt.verify(jwtToken, SECRET)
        const decoded = jwt.decode(jwtToken);
        const user = decoded.user;
        if (!user) {
            return res.redirect('/register')
        }
        req.userId = user;
        const token = jwt.sign({ user }, SECRET, { expiresIn: 10 })
        res.cookie('token', token)
        return next()
    } catch (error) {
        return res.redirect('/register')
    }
}


app.get('/', authUser, async (req, res) => {
    const flights = await getAllFlightsDetails();
    res.render('index', { flights }); // Serve ejs
});

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async (req, res) => {
    const userData = req.body;
    if (true) {
        const hashedPassword = bcrypt.hashSync(userData.password, 10);
        userData.password = hashedPassword;
        const userId = await createCustomer(userData)
        const token = jwt.sign({ user: userId[0] }, SECRET, { expiresIn: '1m' })
        res.cookie('token', token).redirect('/')
    } else {
        res.render('register', { userData })
    }
})


app.post('/api/createCustomer', async (req, res) => {
    const userData = req.body;
    if (true) {
        const hashedPassword = bcrypt.hashSync(userData.password, 10);
        userData.password = hashedPassword;
        const userId = await createCustomer(userData)
        const token = jwt.sign({ user: userId[0] }, SECRET, { expiresIn: '1m' })
        res.cookie('token', token).json({ userId: userId[0] })
    } else {
        res.status(400).json({ error: 'Error creating user' })
    }

})


app.get('/flights/:id/edit', authUser, async (req, res) => {
    const id = req.params.id
    const flight = await getAllFlightsDetailsById(id);

    flight.departure_time = mysqlDatetimeToHtmlDatetimeLocal(flight.departure_time)
    flight.landing_time = mysqlDatetimeToHtmlDatetimeLocal(flight.landing_time)

    const countries = await getAllCountries();
    res.render('editFlight', { flight, countries }); // Serve ejs
});


app.post('/flights/:id/submit', authUser, async (req, res) => {
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
    console.log(req.query)
    try {
        const flightsDetails = await getAllFlightsDetails(req.query?.search);
    
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