import { Route, Routes } from 'react-router-dom';

import { Quizzes } from './Quizzes';
import { QuizList } from '../components/QuizList';
import { GetQuiz } from '../components/GetQuiz';
import { CreateQuiz } from '../components/CreateQuiz';
import { CreateQuestion } from '../components/CreateQuestion';
import { CreateQuestionResult } from '../components/CreateQuestionResult';

export const QuizRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<QuizList />} />
      <Route path="/:quizId" element={<GetQuiz />} />
      <Route path="/new" element={<CreateQuiz />} />
      <Route path="/new/:quizId" element={<CreateQuestion />} />
      <Route path="/new/result/:quizId" element={<CreateQuestionResult />} />
      <Route path="/mypage" element={<Quizzes />} />
    </Routes>
  );
};
