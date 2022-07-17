import { rest } from 'msw';
import { nanoid } from 'nanoid';

import { db } from '../db';
import { hash, authenticate, requireAuth } from '../utils';

type RegisterBody = {
  username: string;
  email: string;
  password: string;
};

type LoginBody = {
  email: string;
  password: string;
};

export const authHandlers = [
  rest.post<RegisterBody>('/api/users/signup', (req, res, ctx) => {
    try {
      const userObject = req.body;

      const existingUser = db.user.findFirst({
        where: {
          email: {
            equals: userObject.email,
          },
        },
      });

      if (existingUser) {
        throw new Error('The user already exists');
      }

      db.user.create({
        ...userObject,
        id: nanoid(),
        password: hash(userObject.password)
      });

      const result = authenticate({ email: userObject.email, password: userObject.password });

      return res(ctx.json(result));
    } catch (error: any) {
      return res(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),

  rest.post<LoginBody>('/api/users/signin', (req, res, ctx) => {
    try {
      const credentials = req.body;
      const result = authenticate(credentials);
      return res(ctx.json(result));
    } catch (error: any) {
      return res(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),

  rest.get('/api/users/auth/me', (req, res, ctx) => {
    try {
      const user = requireAuth(req);
      return res(ctx.json(user));
    } catch (error: any) {
      return res(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),
];
