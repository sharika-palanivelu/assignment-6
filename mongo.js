const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

// Replace <username>, <password>, and <cluster-url> with your actual details
const uri = "mongodb+srv://sharika:sharika04@cluster0.d7vbb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function connectToAtlas() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas");

        // Optionally, you can select the database and collection here
        const database = client.db('yourDatabaseName');
        const collection = database.collection('yourCollectionName');

        // Sample operation: Find all documents in the collection
        const result = await collection.find({}).toArray();
        console.log(result);

        return `Connected to MongoDB Atlas. Collection Data: ${JSON.stringify(result)}`;

    } catch (error) {
        console.error('Connection error:', error);
        return `Connection error: ${error}`;
    } finally {
        await client.close();
    }
}

// Serve the result on a webpage
app.get('/', async (req, res) => {
    const message = await connectToAtlas();
    res.send(`<h1>MongoDB Connection Status</h1><p>${message}</p>`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

