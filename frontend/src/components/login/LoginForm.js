import { useState } from "react";
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../graphql/mutations';
import UserInfoInput from "./UserInfoInput";

function LoginForm({ setIsLoggedIn, setUserName }) {
    const [userName, setUserLoginName] = useState('');
    const [password, setPassword] = useState('');
    const [login, { loading, error }] = useMutation(LOGIN_USER);
    const isVaild = userName && password;

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await login({ variables: { userName, password } });
            const token = result.data.login;
            console.log('Login successful, token:', token);

            localStorage.setItem('token', token);
            setIsLoggedIn(true);
            localStorage.setItem('userName', userName);
            setUserName(userName);
        } catch (err) {
            console.error('Error logging in:', err);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <UserInfoInput type='text' placeholder='사용자 아이디' setState={setUserLoginName} />
            <UserInfoInput type='password' placeholder='비밀번호' setState={setPassword} />
            <button className='login-btn' type="submit" disabled={!isVaild}>로그인</button>
        </form>
    )
}

export default LoginForm;