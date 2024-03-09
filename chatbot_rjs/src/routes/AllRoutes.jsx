// import React from 'react';
import SignIn from '../pages/SignIn';
import { Routes, Route } from 'react-router-dom';
import SignUp from '../pages/SignUp';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
  );
};

export default AllRoutes;
