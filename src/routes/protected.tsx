import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Text } from '@chakra-ui/layout';
import { useAuth } from '@/lib/auth';

const App = () => {
  return (
    <div>
      <Suspense 
        fallback={
          <div>
            <p>Loading...</p>
          </div>
        }>
        <Outlet />
      </Suspense>
    </div>
  );
};

const TopPage = () => {
  const { user } = useAuth();
  console.log(user);
  
  let userName;
  if (user) {
    userName = user.username
  } else {
    userName = 'guest';
  }

  return (
    <Text fontSize='xl' color='white'>Hello, {userName}</Text>
  );
}

export const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [
      { path: '/app', element: <TopPage /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
