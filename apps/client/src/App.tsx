import './App.css';
import FeaturedJobs from './components/FeaturedJobs';
import MainPage from './components/MainPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <MainPage />
      <FeaturedJobs />
    </>
  );
}

export default App;
