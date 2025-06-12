import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    type: {
      type: String,
      enum: ['cake', 'box', 'card'],
      required: true
    },
    cakes: {
      cakeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cake'
      },
      cakeName: String,
      cakePrice: Number,
      quantity: Number
    },
    boxes: {
      boxId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Box'
      },
      boxName: String,
      boxPrice: Number,
      quantity: Number
    },
    cards: {
      cardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
      },
      cardName: String,
      cardPrice: Number,
      quantity: Number,
      to: String,
      from: String
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Cancelled'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order; 