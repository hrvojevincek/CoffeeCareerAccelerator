import { Route, Routes } from 'react-router-dom';

import LoginPage from '../../pages/auth/login/LoginPage';
import SignupPage from '../../pages/auth/signup/SignupPage';
import CompanyPage from '../../pages/CompanyPage';
import MainPage from '../../pages/home/MainPage';
import JobDetailPage from '../../pages/JobDetailPage';
import JobsPage from '../../pages/jobs/JobsPage';
import UserPage from '../../pages/UserPage';
import { RequireAuth } from '../RequireAuth';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/jobs" element={<JobsPage />} />
    <Route path="/jobs/:id" element={<JobDetailPage />} />

    {/* Protected routes requiring authentication */}
    <Route
      path="/user/:id/*"
      element={
        <RequireAuth>
          <UserPage />
        </RequireAuth>
      }
    />

    <Route
      path="/employer/:id/*"
      element={
        <RequireAuth allowedRoles={['employer']}>
          <CompanyPage />
        </RequireAuth>
      }
    />

    <Route
      path="/employer"
      element={
        <RequireAuth allowedRoles={['employer']}>
          <CompanyPage />
        </RequireAuth>
      }
    />
  </Routes>
);

export default AppRoutes;
