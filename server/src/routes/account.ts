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
accountRouter.get('/', requiresAuth('admin'), getAllAccountsHandler);

// Edit your profile
accountRouter.put('/', requiresAuth(), editAccountHandler);

// Delete account
accountRouter.delete('/', requiresAuth(), deleteAccountHandler);

// Get account profile
accountRouter.get('/:accountId', requiresAuth(), getAccountHandler);

// Activate account
accountRouter.get('/verify-email/:accountId', activateAccountHandler);

export default accountRouter;
