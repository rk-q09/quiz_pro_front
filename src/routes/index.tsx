import { useRoutes } from 'react-router';

import { Landing } from '@/features/misc/routes';
import { useAuth } from '@/lib/auth';

import { publicRoutes } from './public';
import { protectedRoutes } from './protected';

export const AppRoutes = () => {
  const auth = useAuth();

  const commonRoutes = [{ path: '/', element: <Landing /> }];

  const routes = auth.user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
