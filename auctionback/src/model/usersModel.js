import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const { Schema } = mongoose;

mongoose.connect(process.env.MONGO_DB)
  .then(() => {
    console.log('Connected to mongoose');
  })
  .catch((e) => {
    console.log(e);
  });

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  token: {
    type: String
  }
}, {
  timestamps: true
});

export default mongoose.model('Users', UserSchema);
