import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from './contexts/UserContext';
import { queryClient } from './services/queryClient';
import AppRoutes from './components/AppRoutes/AppRoutes';
import Navbar from './components/Navbar';

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
