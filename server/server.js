import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
const port = 3000;

// MongoDB connection URL
const mongoURL = '';

let client; // Define the client variable at the module level

// Connect to MongoDB
MongoClient.connect(mongoURL)
  .then(connection => {
    client = connection; // Assign the connection to the client variable
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

// Define an endpoint to retrieve data from MongoDB
app.get('/api/data', (req, res) => {
  if (!client) {
    res.status(500).json({ error: 'Database connection not established' });
    return;
  }

  const db = client.db('chartyper'); // Replace 'mydatabase' with your database name
  const collection = db.collection('highscores'); // Replace 'mycollection' with your collection name

  collection.find({}).toArray()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

app.post('/api/data', express.json(), (req, res) => {
  if (!client) {
    res.status(500).json({ error: 'Database connection not established' });
    return;
  }

  const db = client.db('chartyper'); // Replace 'mydatabase' with your database name
  const collection = db.collection('highscores'); // Replace 'mycollection' with your collection name

  // Assuming the incoming data is in JSON format
  const newData = req.body;

  collection.insertOne(newData)
    .then(result => {
      res.json({ message: 'Data inserted successfully', data: result.ops[0] });
    })
    .catch(err => {
      console.error('Error inserting data:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


