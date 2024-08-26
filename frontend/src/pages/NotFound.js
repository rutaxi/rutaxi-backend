import { BarLoader } from 'react-spinners'
import './Login.css'
import { Link } from 'react-router-dom'
import { GrayCar } from '../assets/chat'

const override = {
  margin: '0 auto',
  borderRadius: '10px',
  maxWidth: '80%',
}

function NotFound() {
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
        없는 페이지입니다 :(
      </div>

      <button id="login-google-btn">
        <Link to="/">
          <GrayCar />
          <span>홈으로 가기</span>
        </Link>
      </button>
    </div>
  )
}

export default NotFound
