import { QueryClientProvider } from '@tanstack/react-query';

import AppRoutes from './components/AppRoutes/AppRoutes';
import Navbar from './components/Navbar';
import { NotificationProvider } from './contexts/NotificationContext';
import { queryClient } from './services/queryClient';

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <Navbar>
          <AppRoutes />
        </Navbar>
      </NotificationProvider>
    </QueryClientProvider>
  );
};

export default App;
