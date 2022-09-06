import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  }
});

module.exports = mongoose.model("PostSchema", postSchema);