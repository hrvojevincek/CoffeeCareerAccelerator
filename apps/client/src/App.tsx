import { QueryClientProvider } from '@tanstack/react-query';

import AppRoutes from './components/AppRoutes/AppRoutes';
import Navbar from './components/Navbar';
import { UserProvider } from './contexts/UserContext';
import { queryClient } from './services/queryClient';

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Navbar>
          <AppRoutes />
        </Navbar>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
