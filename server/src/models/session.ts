import mongoose from 'mongoose';
import { AccountDocument } from './account';

export interface SessionDocument extends mongoose.Document {
  account: AccountDocument['_id'];
  valid: boolean;
  accountAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const SessionSchema = new mongoose.Schema(
  {
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    valid: { type: Boolean, default: true },
    accountAgent: { type: String }
  },
  { timestamps: true }
);

const SessionModel = mongoose.model<SessionDocument>('Session', SessionSchema);

export default SessionModel;
