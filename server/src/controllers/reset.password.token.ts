import { Request, Response } from 'express';
import {
  createResetPasswordToken,
  deleteResetPasswordToken
} from '../services/reset.password.token';
import { sendResetPasswordMail } from '../services/mailer';
import { findAccount, updatePassword } from '../services/account';

export async function createResetPasswordTokenHandler(
  req: Request,
  res: Response
) {
  try {
    const { email } = req.body;

    const account = await findAccount({ email });
    if (!account) {
      return res.status(400).send('Account not found.');
    }
    // eslint-disable-next-line no-underscore-dangle
    const resetPasswordToken = await createResetPasswordToken(account._id);
    // eslint-disable-next-line no-underscore-dangle
    await sendResetPasswordMail(account, resetPasswordToken._id);

    return res.sendStatus(201);
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}

export async function updatePasswordHandler(req: Request, res: Response) {
  try {
    const { tokenId } = req.params;
    const { password, passwordConfirmation } = req.body;
    if (password !== passwordConfirmation) {
      return res.status(400).send('Passwords are not the same.');
    }

    // Delete reset password token
    const token = await deleteResetPasswordToken({ _id: tokenId });
    if (!token) {
      return res.status(400).send('Link has expired.');
    }

    // Update password
    await updatePassword({ _id: token.accountId }, password);

    return res.sendStatus(200);
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}
