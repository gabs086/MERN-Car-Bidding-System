import mongoose from 'mongoose';
const { Schema } = mongoose;

const biddingSchema = new Schema(
  {
    carName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    classType: {
      type: String,
      required: true,
    },
    startingPrice: {
      type: Number,
      required: true,
    },
    currentPrice: {
      type: Number,
      required: false,
    },
    lastBidBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'users',
    },
    expiresOn: {
      type: String,
      required: true,
    },
    isFinished: Boolean,
    soldTo: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'users',
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'users',
    },
    deletedBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'users',
    },
    deletedAt: Date,
  },
  { timestamps: true }
);

const Bidding = mongoose.model('biddings', biddingSchema);
export default Bidding;
