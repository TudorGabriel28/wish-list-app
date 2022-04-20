import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';

const requiresAuth =
  (role?: 'admin') =>
  async (req: Request, res: Response, next: NextFunction) => {
    const account = get(req, 'account');

    if (!account) {
      return res.sendStatus(401);
    }

    if (role !== undefined && role !== account.role) {
      return res.sendStatus(403);
    }

    return next();
  };

export default requiresAuth;
