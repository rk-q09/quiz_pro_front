import { rest } from 'msw';
import { nanoid } from 'nanoid';

import { db } from '../db';

type PostQuizBody = {
  userId: string;
  title: string;
};

export const quizzesHandlers = [
  rest.post<PostQuizBody>('/api/quizzes', (req, res, ctx) => {
    const { userId, title } = req.body;

    const existingUser = db.user.findFirst({
      where: {
        id: {
          equals: userId,
        },
      },
    });

    if (!existingUser) {
      throw new Error('Not found the user');
    }

    const createdQuiz = db.quiz.create({
      title,
      id: nanoid()
    });

    return res(ctx.json(createdQuiz));
  }),
  rest.get('/api/quizzes', (req, res, ctx) => {
    const page = Number(req.url.searchParams.get('page'));
    const limit = Number(req.url.searchParams.get('limit'));

    if (!page || !limit) {
      throw new Error('Invalid url parameters');
    }

    const pageStart = (page - 1) * limit;
    const pageEnd = page * limit;
    
    const quizzes = db.quiz.getAll();
    const skippedQuizzes = quizzes.slice(pageStart, pageEnd);

    return res(ctx.json(skippedQuizzes));
  }),
  rest.get('/api/quizzes/count', (req, res, ctx) => {
    const allQuizzes = db.quiz.getAll();
    return res(ctx.json({ count: allQuizzes.length }));
  })
];

