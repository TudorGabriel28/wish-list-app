import { omit } from 'lodash';
import { Request, Response } from 'express';
import { QueryParams } from '../utils/types';
import {
  createAccount,
  getAllAccounts,
  findAccount,
  editAccount,
  deleteAccount,
  activateAccount
} from '../services/account';
import { sendAccountActivationMail } from '../services/mailer';

export async function createAccountHandler(req: Request, res: Response) {
  try {
    const account = await createAccount(req.body);
    await sendAccountActivationMail(account);
    return res.sendStatus(201);
  } catch (error: any) {
    return res.status(409).send(error.message);
  }
}

export async function getAllAccountsHandler(
  req: Request<any, any, any, QueryParams>,
  res: Response
) {
  try {
    const { sortCriteria, sortOrder, pageNumber, pageSize, search } = req.query;
    const response = await getAllAccounts(
      sortCriteria,
      sortOrder,
      pageNumber,
      pageSize,
      search
    );
    res.setHeader('X-Pagination', JSON.stringify(response.metadata));
    return res.status(200).send(response.accounts);
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}

export async function getAccountHandler(req: Request, res: Response) {
  try {
    const { accountId } = req.params;
    const account = await findAccount({ _id: accountId });
    if (!account) {
      return res.sendStatus(404);
    }
    return res.status(200).send(omit(account, 'password'));
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}

export async function editAccountHandler(req: Request, res: Response) {
  try {
    // @ts-ignore
    const { _id } = req.account;
    const account = await editAccount({ _id }, req.body);
    if (!account) {
      return res.sendStatus(404);
    }
    return res.status(200).send(omit(account, 'password'));
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}

export async function deleteAccountHandler(req: Request, res: Response) {
  try {
    // @ts-ignore
    const { _id, sessionId } = req.account;
    // @ts-ignore
    await deleteAccount(_id, sessionId);
    return res.sendStatus(200);
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}

export async function activateAccountHandler(req: Request, res: Response) {
  try {
    const { accountId } = req.params;
    const account = await activateAccount(accountId);
    return res.status(201).send(omit(account, ['password']));
  } catch (error: any) {
    return res.status(400).send(error.message);
  }
}
