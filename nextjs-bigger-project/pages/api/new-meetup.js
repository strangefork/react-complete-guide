import { MongoClient, ServerApiVersion } from 'mongodb';

//These functions will contain server-side code, and will never be exposed on the browser side.

//api-new-meetup

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect(
      'mongodb+srv://eshlemad:QD2poPLz2oXwl17a@cluster0.fj0oelk.mongodb.net/meetups?retryWrites=true&w=majority'
    ); //This code should NEVER run on the client side.

    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: 'Meetup Inserted!' });
  }
}

export default handler;
