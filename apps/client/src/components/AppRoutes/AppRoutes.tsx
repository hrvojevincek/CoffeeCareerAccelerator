import { Route, Routes } from 'react-router-dom';
import LoginPage from '../../pages/auth/login/LoginPage';
import SignupPage from '../../pages/auth/signup/SignupPage';
import MainPage from '../../pages/home/MainPage';
import CompanyPage from '../../pages/CompanyPage';
import JobDetailPage from '../../pages/JobDetailPage';
import JobsPage from '../../pages/jobs/JobsPage';
import UserPage from '../../pages/UserPage';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/jobs" element={<JobsPage />} />
    <Route path="/jobs/:id" element={<JobDetailPage />} />
    <Route path="/user/:id/*" element={<UserPage />} />
    <Route path="/employer/:id/*" element={<CompanyPage />} />
    <Route path="/employer" element={<CompanyPage />} />
  </Routes>
);

export default AppRoutes;
