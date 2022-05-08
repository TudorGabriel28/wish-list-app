import { LeanDocument } from 'mongoose';
import { ResetPasswordTokenDocument } from '../models/reset.password.token';
import { AccountDocument } from '../models/account';
import mailer from '../utils/mailer';

require('dotenv').config();

export async function sendAccountActivationMail(account: AccountDocument) {
  const mailContent = {
    from: process.env.MAILER_USER,
    to: account.email,
    subject: 'Account activation',
    // eslint-disable-next-line no-underscore-dangle
    text: `${process.env.CLIENT_BASE_URL}/verify-email/${account._id}`
  };

  await mailer(mailContent);
}

export async function sendResetPasswordMail(
  account: AccountDocument | LeanDocument<AccountDocument>,
  tokenId: ResetPasswordTokenDocument['_id']
) {
  const mailContent = {
    from: process.env.MAILER_USER,
    to: account.email,
    subject: 'Reset password',
    text: `${process.env.CLIENT_BASE_URL}/reset-password/${tokenId}`
  };

  await mailer(mailContent);
}
