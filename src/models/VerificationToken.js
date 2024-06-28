import mongoose from 'mongoose';

const VerificationTokenSchema = new mongoose.Schema({
  identifier: String,
  token: { type: String, unique: true },
  expires: Date,
});

export default mongoose.models.VerificationToken || mongoose.model('VerificationToken', VerificationTokenSchema);
