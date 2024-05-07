import React from 'react';
import github from '../../assets/Login/깃허브.png';

const GithubButton = () => {
    const handleLogin = () => {
        window.location.href = `https://github.com/login/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI`;
        //후에 변경https://github.com/login/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}
    };

    return (
        <img src={github} alt="Login with GitHub" onClick={handleLogin} style={{ height: '50px' }}/>
    );
};

export default GithubButton;
