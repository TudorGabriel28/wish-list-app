import { Request, Response } from 'express';
import { get } from 'lodash';
import dayjs from 'dayjs';
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
    return res.status(401).send('Invalid account name or password');
  }

  // Create a session
  const session = await createSession(
    // eslint-disable-next-line no-underscore-dangle
    account._id,
    req.get('user-agent') || ''
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

  res.cookie('refreshTokenCookie', refreshToken, {
    secure: true,
    httpOnly: true,
    expires: dayjs()
      // @ts-ignore
      .add(parseInt(process.env.REFRESH_TOKEN_TTL, 10), 'days')
      .toDate()
  });

  // send refresh & access token back
  return res.send({ ...account, accessToken });
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
