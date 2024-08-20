// src/services/api.js
import axios from 'axios';

// const API_URL = 'http://localhost:5000/api'; 
// const Twitter_URL = 'http://localhost:5000/auth'; // Cambia esto a la URL de tu servidor si es necesario

const API_URL = 'http://192.168.56.16:5000/api'; 
const Twitter_URL = 'http://192.168.56.16:5000/auth'; 

const api = axios.create({
    baseURL: API_URL,
});
const apiTwitter = axios.create({
    baseURL: Twitter_URL,
});
export const register = async (userData) => {
    return api.post('/users/register', userData);
};

export const login = async (userData) => {
    return api.post('/users/login', userData);
};

export const getProfile = async (token) => {
    return api.get('/users/profile', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const setup2FA = async (token) => {
    return api.get('/users/2fa/setup', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const verify2FA = async (token, otpCode) => {
    return api.post('/users/2fa/verify', { otpCode }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const tweet = async (status, token) => {
    return apiTwitter.post('/tweet', { status }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const saveTokens = async (accessToken, accessTokenSecret, token) => {
    return apiTwitter.post('/save-tokens', { accessToken, accessTokenSecret }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
export const saveTokensT = async (accessToken,  token) => {
    return apiTwitter.post('/face/save-tokens', { accessToken }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};


