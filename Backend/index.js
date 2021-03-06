const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const dotenv = require("dotenv");
dotenv.config();

const mountRoutes = require('./routes')

const app = express()
app.use(cors());
app.use(bodyParser.json())

mountRoutes(app)
app.use((req, res, next) => {
    res.sendStatus(404);
});

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
})
