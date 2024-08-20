import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import TwoFactorVerify from './components/pages/TwoFactorVerify';
import Home from './components/pages/Home';
import Setup2FA from './components/pages/Setup2FA';
import Twitter from './components/pages/socialApps/Twitter';
import SaveTokensPage from './components/pages/socialApps/SaveTokensPage';
import SaveTokenT from './components/pages/socialApps/SaveTokenT';
import Facebook from './components/pages/socialApps/Facebook';


// Simulación de un estado de autenticación
const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

// Componente para proteger rutas
const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

function App() {
  const [is2FARequired, setIs2FARequired] = useState(false);

  const update2FAStatus = (status) => {
    setIs2FARequired(status);
  };
  return (
    //<Route path="/prueba" element={<Home is2FARequired={is2FARequired} />} />

    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login update2FAStatus={update2FAStatus} />} />
        <Route path="/2fa" element={<TwoFactorVerify />} />
        <Route path="/setup2fa" element = {<PrivateRoute element={<Setup2FA update2FAStatus={update2FAStatus}/>}/>} />
        <Route path="/" element={<PrivateRoute element={<Home is2FARequired={is2FARequired} />} />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/h" element={<Home />} />
        <Route path="/twitter" element={<Twitter />} />
        <Route path="/facebook" element={<Facebook />} />
        <Route path="/saveTokens" element={<SaveTokensPage />} />
        <Route path="/saveTokensT" element={<SaveTokenT />} />
      </Routes>
    </Router>
  );
}

export default App;
