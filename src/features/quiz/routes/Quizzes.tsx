import { useAuth } from '@/lib/auth';

import { ContentLayout } from '@/components/Layout';
import { UsersQuizList } from '../components/UsersQuizList';

export const Quizzes = () => {
  const { user } = useAuth();
  if (user) {
    return (
      <ContentLayout>
        <UsersQuizList userId={user.id} />
      </ContentLayout>
    );
  }
  return <p>No Authorization</p>;
};
