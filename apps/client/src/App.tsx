import './App.css';
import FeaturedJobs from './components/FeaturedJobs';
import Footer from './components/Footer';
import MainPage from './components/MainPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <MainPage />
      <FeaturedJobs />
      <Footer />
    </>
  );
}

export default App;
