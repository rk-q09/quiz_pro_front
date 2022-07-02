import { Route, Routes } from 'react-router-dom';

import { Quizzes } from './Quizzes';
import { AllQuizList } from '../components/AllQuizList';
import { GetQuiz } from '../components/GetQuiz';
import { CreateQuiz } from '../components/CreateQuiz';
import { CreateQuestion } from '../components/CreateQuestion';
import { CreateQuestionResult } from '../components/CreateQuestionResult';
import { SearchQuizResults } from '../components/SearchQuizResults';

export const QuizRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AllQuizList />} />
      <Route path="/:quizId" element={<GetQuiz />} />
      <Route path="/new" element={<CreateQuiz />} />
      <Route path="/new/:quizId" element={<CreateQuestion />} />
      <Route path="/new/result/:quizId" element={<CreateQuestionResult />} />
      <Route path="/mypage" element={<Quizzes />} />
      <Route path="/search/:word" element={<SearchQuizResults />} />
    </Routes>
  );
};
