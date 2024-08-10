import { useState } from 'react';
import { BarLoader } from 'react-spinners';
import { GoogleIcon } from '../assets/login';
import { LoginForm, JoinForm } from '../components/login';
import './Login.css';

const override = {
    margin : '0 auto',
    borderRadius : '10px',
    maxWidth: '80%',
};

function Login({ setIsLoggedIn, setUserName }) {
    const [login, setLogin] = useState(true);

    return (
        <div id='login-wrapper' className={`${login ? "login-state-wrapper" : "join-state-wrapper"}`}>
            {/* 로고 */}
            <h1 id='login-title'>Ride <span id="login-title-green">Us</span></h1>
            {login? 
                <BarLoader
                color="#A0A0A0"
                height={"0.7em"}
                cssOverride={override}
                loading={true}
                speedMultiplier={0.8}
                width={"14em"}/> : null }

            {/* 구글 로그인 */}
            <button id='login-google-btn'>
                <GoogleIcon />
                <span>Sign in with Google</span>
            </button>

            {/* 로그인 유형 구분선 */}
            <div id='login-or'>
                <hr /><div>또는</div>
            </div>

            {/* 로그인 폼 */}
            {login ? <LoginForm setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} /> : <JoinForm setLogin={setLogin} />}

            {/* 로그인/회원가입 전환 */}
            <div id='login-join-wrapper' onClick={() => setLogin(!login)}>
                <div>{login ? "회원이 아니신가요?" : "이미 회원이신가요?"}</div>
                <div id='login-to-join'>{login ? "회원가입하기" : "로그인하기"}</div>
            </div>
        </div>
    );
}

export default Login;