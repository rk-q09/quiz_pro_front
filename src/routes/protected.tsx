import { Suspense, lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Text } from '@chakra-ui/layout';
import { useAuth } from '@/lib/auth';

import { MainLayout } from '@/components/Layout/MainLayout';
const QuizRoutes = lazy(() => import('@/features/quiz'));

const App = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div>
            <p>Loading...</p>
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

const TopPage = () => {
  const { user } = useAuth();
  let userName;
  if (user) {
    userName = user.username;
  } else {
    userName = 'guest';
  }

  return (
    <>
      <Text fontSize="xl" color="white">
        Hello, {userName}
      </Text>
    </>
  );
};

export const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [
      { path: '/app', element: <TopPage /> },
      { path: '/app/quiz/*', element: <QuizRoutes /> },
      { path: '/app/*', element: <Navigate to="." /> },
    ],
  },
];
