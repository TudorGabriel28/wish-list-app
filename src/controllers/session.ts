import { Request, Response } from 'express';
import { get } from 'lodash';
import { validatePassword } from '../services/account';
import {
  createSession,
  createAccessToken,
  updateSession,
  findSessions
} from '../services/session';
import { sign } from '../utils/jwt';

export async function createAccountSessionHandler(req: Request, res: Response) {
  // Validate the email and password
  const account = await validatePassword(req.body);

  if (!account) {
    return res.status(401).send('Invalid accountname or password');
  }

  // Create a session
  const session = await createSession(
    // eslint-disable-next-line no-underscore-dangle
    account._id,
    req.get('account-agent') || ''
  );

  // Create access token
  const accessToken = createAccessToken({
    account,
    session
  });

  // Create refresh token
  const refreshToken = sign(session, {
    expiresIn: process.env.REFRESH_TOKEN_TTL
  });

  // send refresh & access token back
  return res.send({ accessToken, refreshToken });
}

export async function invalidateAccountSessionHandler(
  req: Request,
  res: Response
) {
  try {
    const sessionId = get(req, 'account.session');

    await updateSession({ _id: sessionId }, { valid: false });

    return res.sendStatus(200);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
}

export async function getAccountSessionsHandler(req: Request, res: Response) {
  try {
    const accountId = get(req, 'account._id');

    const sessions = await findSessions({ account: accountId, valid: true });

    return res.send(sessions);
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}
