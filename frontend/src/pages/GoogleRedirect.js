import { useMutation } from '@apollo/client'
import { RESTORE_ACCESS_TOKEN } from '../graphql/mutations'
import { useHistory } from 'react-router-dom'

function GoogleRedirect({ setIsLoggedIn }) {
  const [restoreAccessToken] = useMutation(RESTORE_ACCESS_TOKEN)
  const history = useHistory()

  useEffect(() => {
    const fetchAccessToken = async () => {
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

    if (token) {
      fetchAccessToken()
    }
  }, [])

  return <div>Redirecting...</div>
}

export default GoogleRedirect
