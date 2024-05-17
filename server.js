const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');


const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server Started at Port : ${PORT}`)
})