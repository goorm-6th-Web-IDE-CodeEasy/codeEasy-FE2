import React from 'react';
import google from '../../assets/Login/구글.png';

const GoogleButton = () => {
    const handleLogin = () => {
        window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=email profile`;
        //후에 변경 https://accounts.google.com/o/oauth2/v2/auth?scope=email%20openid&response_type=code&redirect_uri=${REDIRECT_URI}&client_id=${REST_API_KEY}
    };

    return (
        <img src={google} alt="Login with Google" onClick={handleLogin} style={{ height: '50px' }} />
    );
};

export default GoogleButton;
