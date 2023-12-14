// pages/api/attendance/mark.js
//This file is server that will contain the logic for receiving attendance data from
// the frontend and saving it to MongoDB.

import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const client = await MongoClient.connect(process.env.MONGODB_URI);
      const db = client.db('myFirstDatabase');
      const collection = db.collection('attendance');

      // Extract data from request body
      const { student_id, student_name, subject, is_present } = req.body;

      // Insert data into the database
      await collection.insertOne({
        student_id,
        student_name,
        subject,
        is_present,
        timestamp: new Date()
      });

      client.close();
      res.status(200).json({ message: 'Attendance recorded successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error recording attendance', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
