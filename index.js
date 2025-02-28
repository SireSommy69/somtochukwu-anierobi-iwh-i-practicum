require('dotenv').config(); // Load environment variables

const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Load HubSpot Private App Token from .env
const PRIVATE_APP_ACCESS = process.env.HUBSPOT_ACCESS_TOKEN;

if (!PRIVATE_APP_ACCESS) {
    console.error("Error: HUBSPOT_ACCESS_TOKEN is not set in .env file.");
    process.exit(1); // Stop execution if no token is found
}

const CUSTOM_OBJECT_NAME = 'games';

const HEADERS = {
    Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
    'Content-Type': 'application/json'
};

// ----------------------
// ROUTE 1: Homepage - Fetch & Display Games Data
// ----------------------
app.get('/', async (req, res) => {
    const url = `https://api.hubapi.com/crm/v3/objects/${CUSTOM_OBJECT_NAME}?properties=game_name,name,color,release_year,price`;

    try {
        const response = await axios.get(url, { headers: HEADERS });
        const records = response.data.results || [];
        res.render('homepage', { title: 'Games | HubSpot API', records });
    } catch (error) {
        console.error("Error fetching records:", error.response?.data || error.message);
        res.status(500).send("Failed to retrieve records.");
    }
});

// ----------------------
// ROUTE 2: Display Form Page for Adding a New Game
// ----------------------
app.get('/update-cobj', (req, res) => {
    res.render('updates', { title: 'Update Game | HubSpot API' });
});

// ----------------------
// ROUTE 3: Handle Form Submission & Create New Game Record
// ----------------------
app.post('/update-cobj', async (req, res) => {
    const url = `https://api.hubapi.com/crm/v3/objects/${CUSTOM_OBJECT_NAME}`;

    const newRecord = {
        properties: {
            game_name: req.body.game_name,
            name: req.body.model,
            color: req.body.color,
            release_year: parseInt(req.body.release_year, 10),
            price: parseFloat(req.body.price)
        }
    };

    try {
        await axios.post(url, newRecord, { headers: HEADERS });
        res.redirect('/');
    } catch (error) {
        console.error("Error creating record:", error.response?.data || error.message);
        res.status(500).send("Failed to create record.");
    }
});

// Start Server
app.listen(3000, () => console.log('Listening on http://localhost:3000'));
