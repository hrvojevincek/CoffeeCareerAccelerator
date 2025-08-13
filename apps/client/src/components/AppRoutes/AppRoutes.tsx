import { Route, Routes } from 'react-router-dom';

import AuthPage from '../../pages/auth/AuthPage';
import BlogPage from '../../pages/blog/BlogPage';
import CompaniesPage from '../../pages/companies/CompaniesPage';
import CompanyPage from '../../pages/CompanyPage';
import MainPage from '../../pages/home/MainPage';
import JobDetailPage from '../../pages/JobDetailPage';
import JobsPage from '../../pages/jobs/JobsPage';
import UserPage from '../../pages/UserPage';
import { RequireAuth } from '../RequireAuth';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/auth" element={<AuthPage />} />
    <Route path="/signup" element={<AuthPage />} />
    <Route path="/login" element={<AuthPage />} />
    <Route path="/jobs" element={<JobsPage />} />
    <Route path="/jobs/:id" element={<JobDetailPage />} />
    <Route path="/companies" element={<CompaniesPage />} />
    <Route path="/blog" element={<BlogPage />} />

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
