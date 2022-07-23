import { authHandlers } from './auth';
import { quizzesHandlers } from './quizzes';

export const handlers = [...authHandlers, ...quizzesHandlers];
