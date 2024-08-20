import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Navbar.css'

const NavBar = ({ is2FARequired }) => {  // Cambiado aquí
  const navigate = useNavigate();

  const handleLogout = () => {
    // Elimina el token de autenticación
    localStorage.removeItem('token');
    
    // Redirige al usuario a la página de login
    navigate('/login');
  };
  const handleSetup2FA = () => {
    // Redirige al usuario a la página de login
    navigate('/setup2fa');
  };

  return (
    <nav>
      <h2>Social Hub Manager</h2>
      <div className="button-container">
        {is2FARequired ? (
          <button className="twofa" disabled>Eliminar 2FA</button>
        ) : (
          <button className="twofa" onClick={handleSetup2FA} >Setup 2FA</button>
        )}
        <button className="logout" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default NavBar;
