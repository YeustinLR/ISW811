import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verify2FA } from '../../services/api';
import '../../styles/TwoFactorverify.css'

const TwoFactorVerify = () => {
  const [otpCode, setOtpCode] = useState('');
  const [error, setError] = useState("");


  const navigate = useNavigate();
  const tempToken = localStorage.getItem('tempToken');

  const handleChange = (e) => {
    setOtpCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await verify2FA(tempToken, otpCode);
      localStorage.setItem('token', response.data.token);
      localStorage.removeItem('tempToken');
      navigate('/');
    } catch (error) {
      setError(error.response.data.message || "Error desconocido");
      console.error('Error', error);
    }
  };

  return (
    <div className="twofactor-wrapper">
      <div className="twofactor-container">
          <h1>Verificación de 2FA</h1>
          <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Código OTP" value={otpCode} onChange={handleChange} required />
              <button type="submit">Verificar</button>
          </form>
          {error && <div className="error-message">{error}</div>}
          <div>
            <p>Go back? <a href="/login" onClick={() => {localStorage.removeItem('tempToken');}}
              > Login </a></p>
          </div>
      </div>
    </div>
);

};

export default TwoFactorVerify;
