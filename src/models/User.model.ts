import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  bot: {
    type: Boolean,
    required: true,
  },
});

export const userModel = model('User', userSchema);
