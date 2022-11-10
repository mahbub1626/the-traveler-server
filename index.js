const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config();

// middle ware
app.use(cors())
app.use(express.json())



// mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.3sh2wxl.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        const servicesCollection = client.db('theTraveler').collection('services');
        const reviewsCollection = client.db('theTraveler').collection('reviews');
        // all data
        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = servicesCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });
        // get all reviews
        app.get('/reviews', async (req, res) => {
            const query = {};
            const cursor = reviewsCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });

        // spacific data
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const service = await servicesCollection.findOne(query);
            res.send(service);
        })

        // create service data
        app.post('/services', async (req, res) => {
            const service = req.body;

            console.log(service)
            const result = await servicesCollection.insertOne(service);
            res.send(result);
        })

        // create review data
        app.post('/reviews', async (req, res) => {
            const review = req.body;

            console.log(review)
            const result = await reviewsCollection.insertOne(review);
            res.send(result);
        })


    }
    finally {

    }

}
run().catch(err => console.error(err))



app.get('/', (req, res) => {
    res.send('The Traveler Server Runing')
})
app.listen(port, (req, res) => {
    console.log(`the traveler server running on: ${port}`)
})