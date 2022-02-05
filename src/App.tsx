import { AppProvider } from '@/provider/app';
import { AppRoutes } from '@/routes';

const App = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
};

export default App;
