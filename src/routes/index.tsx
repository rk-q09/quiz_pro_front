import { useRoutes } from 'react-router';

import { Landing } from '@/features/misc/routes';

import { publicRoutes } from './public';

export const AppRoutes = () => {
  const commonRoutes = [{ path: '/', element: <Landing /> }];

  const routes = publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
