import { factory, primaryKey } from '@mswjs/data';

import { testUser } from '../data/testUser';
import { quizGenerator } from '../data/data-generators';
import { hash } from './utils';

const models = {
  user: {
    id: primaryKey(String),
    username: String,
    email: String,
    password: String,
  },
  quiz: {
    id: primaryKey(String),
    title: String,
    questions: {
      content: String,
      answer: Number,
      choices1: String,
      choices2: String,
      choices3: String,
      choices4: String,
    },
  },
};

export const db = factory(models);

db.user.create({
  ...testUser,
  password: hash(testUser.password),
});

for (let i = 0; i < 20; i++) {
  db.quiz.create({
    ...quizGenerator(),
  });
}

export type Model = keyof typeof db;
