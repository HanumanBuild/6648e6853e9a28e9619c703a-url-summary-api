require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { MongoClient } = require('mongodb');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB setup
const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
let db;

client.connect(err => {
  if (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
  db = client.db();
  console.log('Connected to MongoDB');
});

// OpenAI setup
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});