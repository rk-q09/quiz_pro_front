import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
const AuthRoutes = lazy(() => import('@/features/auth'));

export const publicRoutes = [
  {
    path: '/auth/*',
    element: <AuthRoutes />,
    children: [
      { path: '*', element: <Navigate to="." /> }
    ]
  },
];
