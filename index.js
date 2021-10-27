const express = require('express');
//part-01
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

//part-02
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.otlpr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


// another
async function run() {
    try {
        await client.connect();
        const database = client.db('onlineShop');
        const productCollection = database.collection('products');

        // Get Products API
        app.get('/products', async (req, res) => {
            const cursor = productCollection.find({});
            const products = await cursor.toArray();
            // pagination
            const count = await cursor.count();
            res.send({
                count,
                products
            });
        })
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Ema Jhon Server Is Running');
});

app.listen(port, () => {
    console.log('Server Running At Port 5000');
})