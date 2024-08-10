import { useState } from "react";
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../graphql/mutations';
import UserInfoInput from "./UserInfoInput";

function JoinForm({ setLogin }) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [create, { loading, error }] = useMutation(CREATE_USER);
    const isVaild = userName && password && (password === confirmPassword);

    const handleJoin = async (e) => {
        e.preventDefault();
        try {
            const result = await create({ variables: { userName, password } });
            const user = result.data.createUser;
            console.log('Join successful, user:', user);
            setLogin(true);
        } catch (err) {
            console.error('Error logging in:', err);
        }
    };

    return (
        <form onSubmit={handleJoin}>
            {/* <UserInfoInput type='text' placeholder='이메일 주소' /> */}
            <UserInfoInput type='text' placeholder='사용자 아이디' setState={setUserName} />
            <UserInfoInput type='password' placeholder='비밀번호' setState={setPassword} />
            <UserInfoInput
                className={password === confirmPassword ? '' : 'invalid-confirm-password'}
                type='password' placeholder='비밀번호 재확인'
                setState={setConfirmPassword} />
            <button className='login-btn' type="submit" disabled={!isVaild}>회원가입하기</button>
        </form>
    )
}

export default JoinForm;