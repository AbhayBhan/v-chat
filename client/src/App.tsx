import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PrivateRoute />}>
            <Route path='/' element={<Dashboard />} />
          </Route>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
