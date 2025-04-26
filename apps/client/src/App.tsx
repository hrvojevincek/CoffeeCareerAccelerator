import { QueryClientProvider } from '@tanstack/react-query';

import AppRoutes from './components/AppRoutes/AppRoutes';
import Navbar from './components/Navbar';
import { queryClient } from './services/queryClient';

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar>
        <AppRoutes />
      </Navbar>
    </QueryClientProvider>
  );
};

export default App;
