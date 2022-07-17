import { factory, primaryKey } from '@mswjs/data';

import { testUser } from '../data/testUser';
import { hash } from './utils';

const models = {
  user: {
    id: primaryKey(String),
    username: String,
    email: String,
    password: String
  }
};

export const db = factory(models);

db.user.create({
  ...testUser,
  password: hash(testUser.password)
});

export type Model = keyof typeof db;
