import mongoose from 'mongoose';
import { AccountDocument } from './account';

export interface ResetPasswordTokenDocument extends mongoose.Document {
  accountId: AccountDocument['_id'];
  expireAt: Date;
}

const resetPasswordTokenSchema = new mongoose.Schema({
  accountId: { type: mongoose.Schema.Types.ObjectId, required: true },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: '7h' }
  }
});

const ResetPasswordTokenModel = mongoose.model<ResetPasswordTokenDocument>(
  'ResetPasswordToken',
  resetPasswordTokenSchema
);

export default ResetPasswordTokenModel;
