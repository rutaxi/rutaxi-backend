import { useMutation } from '@apollo/client'
import { RESTORE_ACCESS_TOKEN } from '../graphql/mutations'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function GoogleRedirect({ setIsLoggedIn }) {
  const [restoreAccessToken] = useMutation(RESTORE_ACCESS_TOKEN)
  const history = useNavigate()

  useEffect(() => {
    const fetchAccessToken = async () => {
      console.log('fetching access token')
      try {
        const accessToken = await restoreAccessToken()
        localStorage.setItem('token', accessToken.data.restoreAccessToken)
        localStorage.setItem('userName', 'testName')
        setIsLoggedIn(true)
        history.push('/')
      } catch (err) {
        console.error('Error logging in:', err)
      }
    }

    fetchAccessToken()
  }, [])

  return <div>🚖 Redirecting... 🚕 🚕 🚕</div>
}

export default GoogleRedirect
