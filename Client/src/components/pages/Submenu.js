import React from "react";
import { useNavigate } from "react-router-dom";  // Importa el hook useNavigate
import { FaTwitter, FaFacebook } from "react-icons/fa";
import "../../styles/Submenu.css";

const Submenu = () => {
    const navigate = useNavigate();  // Usa el hook para la navegación

    return (
        <div className="submenu-wrapper">
            <div className="submenu-container">
                <h1>Aplicaciones Disponibles</h1>
                <div className="apps">
                    <div className="app-card" onClick={() => navigate('/twitter')}>
                        <FaTwitter className="app-icon twitter-icon" />
                        <span>Twitter</span>
                    </div>
                    <div className="app-card" onClick={() => navigate('/facebook')}>
                        <FaFacebook className="app-icon facebook-icon" />
                        <span>Facebook</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Submenu;
