const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config();

// middle ware
app.use(cors())
app.use(express.json())

// console.log(process.env.DB_USER)
// console.log(process.env.DB_PASSWORD)

// mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.3sh2wxl.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {

    try {
        const productsCollection = client.db('emaJohn').collection('products');

        app.get('/services', async (req, res) => {
            
            const query = {};
            const cursor = productsCollection.find(query);
            const products = await cursor.toArray();
            const count = await productsCollection.estimatedDocumentCount();
            res.send(products);
        });

        app.post('/productsByIds', async (req, res) => {
            
        })
    }
    finally {

    }

}
run().catch(err => console.error(err))



app.get('/', (req, res)=>{
    res.send('The Traveler Server Runing')
})
app.listen(port, (req, res)=>{
console.log(`the traveler server running on: ${port}`)
})