import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  lessons: [{
    _id: String,
    name: String,
    description: String,
    module: String
  }]
}, {
  collection: 'modules'
});

export default mongoose.model('Module', moduleSchema);