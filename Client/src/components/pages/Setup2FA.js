import React, { useState } from 'react';
import { setup2FA } from '../../services/api'; // Importa la función setup2FA
import '../../styles/Setup2FA.css'; // Si tienes estilos personalizados

const Setup2FA = ({ update2FAStatus }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [secret, setSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateQRCode = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token'); // Obtiene el token del almacenamiento local
      const response = await setup2FA(token); // Llama a la API para obtener el QR y el secreto
      setQrCodeUrl(response.data.qrCodeUrl);
      setSecret(response.data.secret.base32);

      // Actualiza el estado de 2FA en la aplicación
      update2FAStatus(true); // Indica que 2FA está configurado
    } catch (error) {
      console.error('Error al generar el código QR:', error);
      setError('No se pudo generar el código QR. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="setup-2fa-container">
      <h1>Configura la Autenticación de Dos Factores</h1>
      <button onClick={handleGenerateQRCode} disabled={loading}>
        {loading ? 'Generando...' : 'Generar Código QR'}
      </button>

      {error && <p className="error-message">{error}</p>}

      {qrCodeUrl && (
        <div className="qr-code-section">
          <img src={qrCodeUrl} alt="QR Code para 2FA" className="qr-code-img" />
          <p>Escanea el código QR con tu aplicación de autenticación</p>
          <p>Clave secreta: <strong>{secret}</strong></p>
        </div>
      )}
      <div>
        <p>Go Back? <a href="/home">Home</a></p>
      </div>
    </div>
  );
};

export default Setup2FA;
