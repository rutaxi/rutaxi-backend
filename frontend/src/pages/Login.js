import { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners'
import { GoogleIcon } from '../assets/login'
import { LoginForm, JoinForm } from '../components/login'
import './Login.css'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

import { useMutation } from '@apollo/client'
import { RESTORE_ACCESS_TOKEN } from '../graphql/mutations'

const override = {
  margin: '0 auto',
  borderRadius: '10px',
  maxWidth: '80%',
}

function Login({ setIsLoggedIn, setUserName }) {
  const [login, setLogin] = useState(true)

  const [restoreAccessToken] = useMutation(RESTORE_ACCESS_TOKEN)

  useEffect(() => {
    // 쿠키에서 refreshToken 가져오기
    const token = Cookies.get('refreshToken')
    // localStorage.setItem('token', token)

    const fetchAccessToken = async () => {
      try {
        const accessToken = await restoreAccessToken()
        localStorage.setItem('token', accessToken.data.restoreAccessToken)
        localStorage.setItem('userName', 'testName')
        setUserName('testName')
        setIsLoggedIn(true)
      } catch (err) {
        console.error('Error logging in:', err)
      }
    }

    if (token) {
      fetchAccessToken()
    }
  }, [])

  return (
    <div
      id="login-wrapper"
      className={`${login ? 'login-state-wrapper' : 'join-state-wrapper'}`}
    >
      {/* 로고 */}
      <h1 id="login-title">
        Ride <span id="login-title-green">Us</span>
      </h1>
      {login ? (
        <BarLoader
          color="#A0A0A0"
          height={'0.7em'}
          cssOverride={override}
          loading={true}
          speedMultiplier={0.8}
          width={'14em'}
        />
      ) : null}

      {/* 구글 로그인 */}
      <button id="login-google-btn">
        <GoogleIcon />
        <span>Sign in with Google</span>
      </button>
      <Link to="http://localhost:3001/login/google" id="login-guest-btn">
        link
      </Link>

      {/* 로그인 유형 구분선 */}
      <div id="login-or">
        <hr />
        <div>또는</div>
      </div>

      {/* 로그인 폼 */}
      {login ? (
        <LoginForm setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} />
      ) : (
        <JoinForm setLogin={setLogin} />
      )}

      {/* 로그인/회원가입 전환 */}
      <div id="login-join-wrapper" onClick={() => setLogin(!login)}>
        <div>{login ? '회원이 아니신가요?' : '이미 회원이신가요?'}</div>
        <div id="login-to-join">{login ? '회원가입하기' : '로그인하기'}</div>
      </div>
    </div>
  )
}

export default Login
