import { FilterQuery, UpdateQuery } from 'mongoose';
import { omit } from 'lodash';
import AccountModel, { AccountDocument } from '../models/account';
import { updateSession } from './session';
import { SessionDocument } from '../models/session';

export async function createAccount(input: AccountDocument) {
  try {
    return await AccountModel.create(input);
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function validatePassword({
  email,
  password
}: {
  email: AccountDocument['email'];
  password: string;
}) {
  const account = await AccountModel.findOne({ email });

  if (!account) {
    return false;
  }

  const isValid = await account.comparePassword(password);

  if (!isValid) {
    return false;
  }

  return omit(account.toJSON(), 'password');
}

export async function findAccount(
  query: FilterQuery<AccountDocument>,
  projection: Object = {},
  options: Object = {}
) {
  return AccountModel.findOne(query, projection, options).lean();
}

export async function getAllAccounts(
  sortCriteria: string = 'createdAt',
  sortOrder: string | number = 1,
  pageNumber: number = 1,
  pageSize: number = 20,
  search?: string
) {
  try {
    const searchCriteria = {};
    let limit;
    const maxPageSize = 50;

    if (pageSize > maxPageSize) {
      limit = maxPageSize;
    } else {
      limit = pageSize;
    }

    const skip = (pageNumber - 1) * pageSize;

    if (search) {
      // @ts-ignore
      searchCriteria.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { nickname: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const accounts = await AccountModel.find(searchCriteria, { password: 0 })
      .sort({ [sortCriteria]: sortOrder })
      .limit(limit)
      .skip(skip)
      .lean()
      .exec();

    const totalCount = await AccountModel.count();
    const totalPages = Math.ceil(totalCount / pageSize);
    const hasNext = pageNumber < totalPages;
    const hasPrevious = pageNumber !== 1;

    const metadata = {
      pageSize,
      pageNumber,
      totalPages,
      hasNext,
      hasPrevious
    };

    return { accounts, metadata };
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function editAccount(
  query: FilterQuery<AccountDocument>,
  updates: UpdateQuery<AccountDocument>
) {
  try {
    return await AccountModel.findOneAndUpdate(query, updates, {
      new: true
    }).lean();
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deleteAccount(
  query: FilterQuery<AccountDocument>,
  sessionId: FilterQuery<SessionDocument>
) {
  try {
    await AccountModel.deleteOne({ query });
    await updateSession({ _id: sessionId }, { valid: false });
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function activateAccount(accountId: string) {
  try {
    return await AccountModel.findOneAndUpdate(
      { _id: accountId },
      { active: true },
      { new: true }
    ).lean();
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function updatePassword(
  query: FilterQuery<AccountDocument>,
  password: AccountDocument['password']
) {
  try {
    const account = await AccountModel.findOne(query);
    if (!account) {
      throw new Error("Account doesn't exist anymore.");
    }
    account.password = password;
    await account.save();
    // eslint-disable-next-line no-underscore-dangle
    // need to return a lean object
  } catch (error: any) {
    throw new Error(error);
  }
}
