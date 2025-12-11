import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  description: String,
  points: Number,
  dueDate: String,
  availableDate: String,
  availableUntilDate: String
}, {
  collection: 'assignments'
});

export default mongoose.model('Assignment', assignmentSchema);