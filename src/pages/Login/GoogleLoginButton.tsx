import {GoogleLogin} from "@react-oauth/google";
import {GoogleOAuthProvider} from "@react-oauth/google";

const GoogleLoginButton = () => {
    const clientId = '434108779201-e6404p1umbm42js5mqj7dc9c3jeqitbh.apps.googleusercontent.com';
    return (
        <>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    onSuccess={(res) => {
                        console.log('로그인 성공:', res);
                    }}
                    onFailure={(err) => {
                        console.log('로그인 실패:', err);
                    }}
                />
            </GoogleOAuthProvider>
        </>
    );
};
export default GoogleLoginButton;