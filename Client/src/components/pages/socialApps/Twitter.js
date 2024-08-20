import React, { useState } from "react";
import "../../../styles/Twitter.css"
import { tweet } from "../../../services/api"; // Asegúrate de la ruta correcta

const Twitter = () => {
    const [tweetContent, setTweetContent] = useState("");
    const [error, setError] = useState(null);

    const handleLogin = () => {
        window.location.href = 'http://localhost:5000/auth/twitter';
      };

    const handleChange = (e) => {
        setTweetContent(e.target.value);
    };

    const handleSubmit = async () => {
        const token = localStorage.getItem("token"); // Asegúrate de tener el token de autenticación
        if (!token) {
            alert("No estás autenticado. Por favor, inicia sesión.");
            return;
        }

        try {
            const response = await tweet(tweetContent, token);
            alert(response.data); // Mostrar el mensaje del servidor
            setTweetContent(""); // Limpiar el input después de publicar
        } catch (error) {
            console.error("Error al publicar el tweet:", error);
            setError(error.response.data.message);
        }
    };

    return (
        <div className="submenu-wrapper">
            <div className="submenu-container">
                <h1>Twitter</h1>
                <div className="tweet-box">
                    <p className="tweet-label">Crea un Tweet</p>
                    <textarea
                        className="tweet-input"
                        value={tweetContent}
                        onChange={handleChange}
                        placeholder="Escribe tu tweet aquí..."
                    ></textarea>
                    <button className="tweet-button" onClick={handleSubmit}>
                        Publicar
                    </button>
                    {error && <p className="tweet-error">{error}</p>}
                </div>
                <div>
                    <p>Go back? <a href="/h">Home</a></p>
                </div>
                <button className="login-button" onClick={handleLogin}>Vincular cuenta</button>
            </div>

        </div>
    );
};

export default Twitter;

