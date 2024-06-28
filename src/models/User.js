import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, require: true},
  username: { type: String, require: true },
  provider: { type: String, require: true },
  id: {type: String, require: true, unique: true},
  image: String,
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
