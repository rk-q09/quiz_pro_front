import { Route, Routes } from 'react-router-dom';

import { Register } from './Register';
import { Login } from './Login';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="signin" element={<Login />} />
    </Routes>
  );
};
