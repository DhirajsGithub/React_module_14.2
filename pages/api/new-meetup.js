// this will not be a react component
// /api/new-meetup

import { MongoClient } from "mongodb";

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://Mycluster:FQOfwqsBqF4YD3jg@cluster0.djouu.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    try {
      const result = await meetupsCollection.insertOne(data);

      console.log(result);

      client.close();

      res.status(201).json({ message: "Meetup inserted!" });
      console.log("shit");
    } catch (error) {
      console.log(error);
    }
  }
}

export default handler;
