import React from 'react';
import kakao from "../../assets/Login/카카오.png"

const KakaoButton = () => {
    const handleLogin = () => {
        window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code`;
        //후에 변경 https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code
    };

    return (
        <img src={kakao} alt="Login with Kakao" onClick={handleLogin} style={{ height: '50px' }}/>
    );
};

export default KakaoButton;
