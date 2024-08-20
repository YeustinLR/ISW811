import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/api";
import '../../styles/Login.css'
const Login = ({update2FAStatus}) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(formData);
            if (response.data.requires2FA) {
                localStorage.setItem("tempToken", response.data.tempToken);
                update2FAStatus(true);
                navigate("/2fa");
            } else {
                localStorage.setItem("token", response.data.token);
                navigate("/");
            }
        } catch (error) {
            setError(error.response.data.message || "Error desconocido");
            console.error("Error al iniciar sesión:", error);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <h1>Inicio de Sesión</h1>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />
                    <button type="submit">Iniciar Sesión</button>
                </form>
                {error && <div className="error-message">{error}</div>}
                <div className="login-link">
                    <p>No tienes cuenta? <a href="/register">Regístrate</a></p>
                </div>
            </div>
        </div>

    );
    
};

export default Login;
