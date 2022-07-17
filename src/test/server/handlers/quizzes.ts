import { rest } from 'msw';

export const quizzesHandlers = [
  rest.get('/api/quizzes/count', (req, res, ctx) => {
    return res(ctx.json({ count: 20 }));
  })
];

