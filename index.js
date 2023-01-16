const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


//mongodb start

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.rh6ekch.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {
    try {
        // Students collection 
        const studentCollection = client.db('SNservice').collection('studentCollection');

        
        

        app.get('/students', async (req, res) => {
            const query = {};
            const result = await studentCollection.find(query).toArray();
            res.send(result);
        });

        app.post('/students', async (req, res) => {
            const sDetails = req.body;
            const result = await studentCollection.insertOne(sDetails);
            res.send(result);
        });

        app.get('/students/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const student = await studentCollection.findOne(query);
            res.send(student);
        });

        app.patch('/students/:id', async (req, res) => {
            const id = req.params.id;
            const details = req.body;
            const query = { _id: ObjectId(id) };
            const updatedCol = {
                $set: details
            }
            const result = await studentCollection.updateOne(query, updatedCol);
            res.send(result);
        });

        app.delete('/students/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await studentCollection.deleteOne(query);
            res.send(result);
        })

    }
    finally {

    }
}
run().catch(error => console.error(error));
// mongodb end

app.get('/', (req, res) => {
    res.send('the student details server is running');
})

app.listen(port, () => {
    console.log(`the student details server is running on ${port}`);
})