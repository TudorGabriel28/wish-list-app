import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

require('dotenv').config();

let saltRounds: number;

if (process.env.SALT_ROUNDS) {
  saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
} else {
  throw new Error('SALT_ROUNDS is not set');
}

export interface AccountDocument extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  nickname?: string;
  active?: boolean;
  role?: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  // eslint-disable-next-line no-unused-vars
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const accountSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator(v: string) {
          return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          );
        },
        message: 'Please enter a valid email address'
      }
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator(v: string) {
          return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@$!%_*?&]).{8,}$/.test(
            v
          );
        },
        message:
          'Your password must have one lowercase, one uppercase, one number and one special character'
      }
    },
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    nickname: {
      type: String,
      trim: true
    },
    active: {
      type: Boolean,
      default: false
    },
    role: {
      type: String,
      default: 'user'
    }
    // friends: [{ type: Schema.Types.ObjectId, ref: 'Friends' }]
  },
  { timestamps: true }
);

accountSchema.methods.comparePassword = async function comparePassword(
  candidatePassword: string
) {
  const account = this as AccountDocument;

  return bcrypt.compare(candidatePassword, account.password).catch(() => false);
};

accountSchema.pre('save', async function hashPassword(next) {
  const account = this as AccountDocument;

  if (account.isModified('password')) {
    account.password = await bcrypt.hash(account.password, saltRounds);
  }

  next();
});

const AccountModel = model<AccountDocument>('Account', accountSchema);

export default AccountModel;
