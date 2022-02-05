import { useRoutes } from 'react-router';

import { Landing } from '@/features/misc/routes';

export const AppRoutes = () => {
  const commonRoutes = [{ path: '/', element: <Landing /> }];

  const element = useRoutes([...commonRoutes]);

  return <>{element}</>;
};
