import React, { useState } from "react";
import { saveTokensT } from "../../../services/api"; // Asegúrate de la ruta correcta

const SaveTokensTPage = () => {
    const [error, setError] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    const handleSaveTokens = async () => {
        const queryParams = new URLSearchParams(window.location.search);
        const accessToken = queryParams.get('accessToken');
        const token = localStorage.getItem("token"); // Asegúrate de tener el token de autenticación

        if (!token || !accessToken ) {
            alert("Error en la autenticación o falta de tokens.");
            return;
        }

        try {
            setIsSaving(true); // Desactivar el botón mientras se guarda
            await saveTokensT(accessToken,  token);
            window.history.replaceState(null, '', window.location.pathname);
            window.location.href = '/twitter'; // Redirigir después de guardar
        } catch (error) {
            console.error("Error al guardar los tokens:", error.response.data.message);
            setError("Error al guardar los tokens.");
        } finally {
            setIsSaving(false); // Reactivar el botón
        }
    };

    return (
        <div className="save-tokens-container">
            <h2>Guardar tokens de Facebook</h2>
            <p>¿Quieres guardar los tokens de autenticación para tu cuenta de Facebook?</p>
            <button onClick={handleSaveTokens} disabled={isSaving}>
                {isSaving ? "Guardando..." : "Guardar Tokens"}
            </button>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default SaveTokensTPage;
