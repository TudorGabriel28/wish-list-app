import { Router } from 'express';
import {
  createAccountSessionHandler,
  invalidateAccountSessionHandler,
  getAccountSessionsHandler
} from '../controllers/session';

const sessionRouter = Router();

// Login account
sessionRouter.post('/', createAccountSessionHandler);

// Logout account
sessionRouter.delete('/', invalidateAccountSessionHandler);

// Get the account's sessions
sessionRouter.get('/', getAccountSessionsHandler);

export default sessionRouter;
