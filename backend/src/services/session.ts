import { LeanDocument, FilterQuery, UpdateQuery } from 'mongoose';
import { get } from 'lodash';
import SessionModel, { SessionDocument } from '../models/session';
import { AccountDocument } from '../models/account';
import { sign, decode } from '../utils/jwt';
import { findAccount } from './account';

export async function createSession(accountId: string, accountAgent: string) {
  const session = await SessionModel.create({ account: accountId, accountAgent });

  return session.toJSON();
}

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return SessionModel.updateOne(query, update);
}

export async function findSessions(query: FilterQuery<SessionDocument>) {
  return SessionModel.find(query).lean();
}

export function createAccessToken({
  account,
  session
}: {
  account:
    | Omit<AccountDocument, 'password'>
    | LeanDocument<Omit<AccountDocument, 'password'>>;
  session:
    | Omit<SessionDocument, 'password'>
    | LeanDocument<Omit<SessionDocument, 'password'>>;
}) {
  // Build and return the new access token
  const accessToken = sign(
    // eslint-disable-next-line no-underscore-dangle
    { ...account, sessionId: session._id },
    { expiresIn: process.env.ACCESS_TOKEN_TTL }
  );

  return accessToken;
}

export async function reIssueAccessToken({
  refreshToken
}: {
  refreshToken: string;
}) {
  // Decode the refresh token
  const { decoded } = decode(refreshToken);

  if (!decoded || !get(decoded, '_id')) return false;

  // Get the session
  const session = await SessionModel.findById(get(decoded, '_id'));

  // Make sure the session is still valid
  if (!session || !session?.valid) return false;

  const account = await findAccount({ _id: session.account }, { password: 0 });
  if (!account) return false;

  const accessToken = createAccessToken({ account, session });

  return accessToken;
}
