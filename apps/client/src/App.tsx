import 'flowbite';
import 'flowbite/dist/flowbite.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from './pages/MainPage';
import JobDetailPage from './pages/JobDetailPage';
import CompanyPage from './pages/CompanyPage';
import JobsPage from './pages/JobsPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/jobs/" element={<JobsPage />} />
          {/* <Route path="/jobs/categories/:category" element={<JobsPage />} /> */}
          <Route path="/jobs/:id" element={<JobDetailPage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user/:id" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
