import { FilterQuery, QueryOptions } from 'mongoose';
import ResetPasswordTokenModel, {
  ResetPasswordTokenDocument
} from '../models/reset.password.token';
import { AccountDocument } from '../models/account';

export async function createResetPasswordToken(accountId: AccountDocument['_id']) {
  try {
    return await ResetPasswordTokenModel.create({ accountId });
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deleteResetPasswordToken(
  query: FilterQuery<ResetPasswordTokenDocument>,
  options: QueryOptions = {}
) {
  try {
    return await ResetPasswordTokenModel.findOneAndDelete(query, options);
  } catch (error: any) {
    throw new Error(error);
  }
}
