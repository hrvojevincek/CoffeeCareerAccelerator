import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import JobDetailPage from './pages/JobDetailPage';
import CompanyPage from './pages/CompanyPage';
import JobsPage from './pages/JobsPage';
import 'flowbite/dist/flowbite.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/jobs/" element={<JobsPage />} />
          {/* <Route path="/jobs/categories/:category" element={<JobsPage />} /> */}
          <Route path="/jobs/:id" element={<JobDetailPage />} />
          <Route path="/company/:id" element={<CompanyPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
