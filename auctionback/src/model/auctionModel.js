import mongoose from 'mongoose'
const { Schema } = mongoose;

const AuctionSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  startPrice: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  bids: {
    type: Array,
    required: false
  }
}, {
  timestamps: true
});

export default mongoose.model('Auctions', AuctionSchema);