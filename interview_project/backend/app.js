const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

// Connect to MongoDB
const Mongo_url = process.env.MONGO_URL
mongoose.connect(Mongo_url)
 .then(() => console.log('Connected to MongoDB')).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
app.get('/', (req, res) =>{
    res.send('Hello World');
})
app.get('/login', (req, res) =>{
    res.send('Hello World');
})
app.listen(PORT,()=>{console.log(`app listening on port ${PORT}`);});
