import { useMutation } from '@apollo/client'
import { RESTORE_ACCESS_TOKEN } from '../graphql/mutations'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { BarLoader } from 'react-spinners'
import './Login.css'

const override = {
  margin: '0 auto',
  borderRadius: '10px',
  maxWidth: '80%',
}

function GoogleRedirect({ setIsLoggedIn }) {
  const [restoreAccessToken] = useMutation(RESTORE_ACCESS_TOKEN)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAccessToken = async () => {
      console.log('fetching access token')
      try {
        const accessToken = await restoreAccessToken()
        localStorage.setItem('token', accessToken.data.restoreAccessToken)
        localStorage.setItem('userName', 'testName')
        setIsLoggedIn(true)
        navigate('/')
      } catch (err) {
        console.error('Error logging in:', err)
      }
    }

    fetchAccessToken()
  }, [])

  return (
    <div id="login-wrapper" className={`login-state-wrapper`}>
      {/* 로고 */}
      <h1 id="login-title">
        Ride <span id="login-title-green">Us</span>
      </h1>
      <BarLoader
        color="#A0A0A0"
        height={'0.7em'}
        cssOverride={override}
        loading={true}
        speedMultiplier={0.8}
        width={'14em'}
      />

      <div
        style={{
          color: '#454545',
          marginTop: '1em',
        }}
      >
        구글 로그인 중입니다...&nbsp;&nbsp;🚕
      </div>
    </div>
  )
}

export default GoogleRedirect
