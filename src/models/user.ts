import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
  username: {
    type: String,
    trim:true,
    required: true,
    unique: true,
    min: 5,
    max: 15
  },
  password: {
    type: String,
    required: true,
    min:8
  },
  tags: {
    type: [String],
    required: true
  }
});

userSchema.methods = {
	loginToken() {
		const result = jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
			expiresIn: 8640,
		});
    return result
	},
};

module.exports = mongoose.model("UserSchema", userSchema);