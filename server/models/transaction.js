import mongoose from 'mongoose';
const transactionSchema = mongoose.Schema({

  montant : Number,
  description: String,
  type : String,
  account: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Account'
},
  createdAt: {
    type: Date,
    default: Date.now
}
})

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;