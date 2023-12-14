// server/db/models/attendanceModel.js
//This file will define the schema for your attendance data.
import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  student_id: String,
  student_name: String,
  subject: String,
  is_present: Boolean,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Attendance', attendanceSchema);
