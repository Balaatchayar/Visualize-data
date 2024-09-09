const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); 

const app = express();

app.use(cors());
app.use(bodyParser.json());


const mongoURI = process.env.MONGO_URI; // MongoDB URI

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


const dataSchema = new mongoose.Schema({

  name: String,
  age: Number,
});

const Data = mongoose.model('Data', dataSchema);


app.post('/api/saveData', async (req, res) => {
  try {
    const { data } = req.body;

  
    await Data.insertMany(data);
    console.log('Data saved to MongoDB');

    res.status(200).json({ message: 'Data saved to MongoDB' });
  } catch (error) {
    console.error('Error saving data to MongoDB:', error);
    res.status(500).json({ error: 'Error saving data to MongoDB' });
  }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
