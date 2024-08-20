import React from 'react';
import NavBar from './Navbar'; // Importa el NavBar
import Submenu from './Submenu'; // Importa el NavBar

const Home = ({ is2FARequired }) => {
  return (
    <div>
      <NavBar is2FARequired={is2FARequired} />
      <h1>Bienvenido a la página Home</h1>
      {/**/}
      <Submenu />

    </div>
  );
};

export default Home;
