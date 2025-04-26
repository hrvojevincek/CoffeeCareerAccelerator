import Aside from '../components/UserPage/Aside';
import CvPage from '../components/UserPage/CvPage';
import EditProfile from '../components/UserPage/EditProfile';
import Main from '../components/UserPage/Main';
import { useRoutes } from 'react-router-dom';
// import Applications from '../components/UserPage/Applications';

function UserPage() {
  const element = useRoutes([
    // Sub-route path is relative to the current route ("/user/:id")
    { path: '/', element: <Main /> },
    { path: 'edit/', element: <EditProfile /> },
    { path: 'cvpage', element: <CvPage /> },
  ]);

  return (
    <div className="flex">
      <Aside />
      {element}
    </div>
  );
}

export default UserPage;
