import SignIn from '../pages/SignIn';
import { Routes, Route } from 'react-router-dom';
import SignUp from '../pages/SignUp';
import Home from '../pages/Home';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
  );
};

export default AllRoutes;
