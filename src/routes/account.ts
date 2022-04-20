import { Router } from 'express';
import {
  createAccountHandler,
  getAllAccountsHandler,
  getAccountHandler,
  editAccountHandler,
  deleteAccountHandler,
  activateAccountHandler
} from '../controllers/account';
import requiresAuth from '../middlewares/requiresAuth';

const accountRouter = Router();

// Register account
accountRouter.post('/', createAccountHandler);

// Get all accounts
accountRouter.get('/', getAllAccountsHandler);

// Edit your profile
accountRouter.put('/', requiresAuth(), editAccountHandler);

// Delete account
accountRouter.delete('/', deleteAccountHandler);

// Get account profile
accountRouter.get('/:accountId', getAccountHandler);

// Activate account
accountRouter.get('/activate/:accountId', activateAccountHandler);

export default accountRouter;
