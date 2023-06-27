import { userContext } from '../App';
import Aside from '../components/UserPage/Aside';
import { useContext } from 'react';

function CompanyPage() {
  const [user, setUser] = useContext(userContext);

  return (
    <div className="bg-gray-50 flex">
      <Aside />
      <div>POST A JOB MOTHERFKS</div>
    </div>
  );
}

export default CompanyPage;
