import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/api';
import '../../styles/Register.css'


const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState("");


  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/login');
    } catch (error) {
      let err;
    if(error.response?.data?.errors?.[0]?.msg){
      err =error.response.data.errors[0]?.msg ;
    }
    if(error.response.data.message){
      err = error.response.data.message
    }
    setError(err);
    console.error('Error al registrar el usuario:', error);
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
          <h1>Registro</h1>
          <form onSubmit={handleSubmit}>
              <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required />
              <input type="text" name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />
              <button type="submit">Registrar</button>
          </form>
          {error && <div className="error-message">{error}</div>}
          <div className="login-link">
            <p>Ya tienes una cuenta? <a href="/login">Login</a></p>
          </div>
      </div>
    </div>

);

};

export default Register;
