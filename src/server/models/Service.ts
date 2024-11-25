import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  duration: {
    type: Number, // duration in minutes
    required: true
  },
  description: String
});

export default mongoose.model('Service', serviceSchema);