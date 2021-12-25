import mongoose from 'mongoose';

const accountSchema = mongoose.Schema({

  libelle: String,
  solde : Number,
  isActive : Boolean,
  createdAt: {
    type: Date,
    default: Date.now
}
})

const Account = mongoose.model('Account', accountSchema);
export default Account;