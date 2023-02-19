const express = require("express");
const cors = require("cors");

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
//middle wares;
app.use(cors());
app.use(express.json());
//''''''''''''''''''''''''''''''''/
//user: shajukCar;
//password: 0MNm2QgcEyay76tf
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);
// ${process.env.DB_USER}:${process.env.DB_PASSWORD}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fm710lc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const serviceCollection = client
      .db("sssgeniusCargeniusCar")
      .collection("servicessservicess");
    const orderCollection = client
      .db("sssgeniusCargeniusCar")
      .collection("orders");

    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });
    //class67-3
    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const service = await serviceCollection.findOne(query);
      res.send(service);
    });
    // order api;
    app.post("/orders", async (req, res) => {
      const order = req.body;
      const result = await orderCollection.insertOne(order);
      res.send(result);
    });
  } finally {
  }
}

run().catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("genius car server is running");
});
-app.listen(port, () => {
  console.log(`genius car server running pon${port}`);
});
