import mongoose from 'mongoose'
const { Schema } = mongoose;

const TokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'Users' },
  refreshToken: { type: String, required: true }
})

export default mongoose.model('Token', TokenSchema)