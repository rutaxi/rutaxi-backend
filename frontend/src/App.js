import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'
import { useLocation, Navigate } from 'react-router-dom'
import {
  CreateTaxiParty,
  EditProfile,
  Main,
  MyPage,
  TaxiPartyChat,
  TaxiPartyDetail,
  TaxiPartyList,
} from './pages'
import NavBar from './components/navBar/NavBar'
import './App.css'
import GoogleRedirect from './pages/GoogleRedirect'
import NotFound from './pages/NotFound'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('token') ? true : false
  )
  const [userName, setUserName] = useState(
    localStorage.getItem('userName') ? localStorage.getItem('userName') : ''
  )
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem('userEmail') ? localStorage.getItem('userEmail') : ''
  )

  const location = useLocation()
  const disappearNavBar = !(
    location.pathname === '/taxi-party-chat' ||
    location.pathname === '/edit-profile'
  )

  const [navActive, setNavActive] = useState(
    location.pathname === '/taxi-party-list'
      ? 'list'
      : location.pathname === '/mypage'
        ? 'search'
        : 'home'
  )
  const [navChage, setNavChange] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    localStorage.removeItem('userEmail')
    document.cookie = 'rutaxiRefreshToken=; Max-Age=0; path=/;'

    setIsLoggedIn(false)
    // closeModal();
    // goToMain();
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Main
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              setUserName={setUserName}
              setUserEmail={setUserEmail}
            />
          }
        />
        <Route
          path="/taxi-party-list"
          element={isLoggedIn ? <TaxiPartyList /> : <Navigate to="/" />}
        />
        <Route
          path="/taxi-party-detail"
          element={
            isLoggedIn ? (
              <TaxiPartyDetail userName={userName} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/create-taxi-party"
          element={isLoggedIn ? <CreateTaxiParty /> : <Navigate to="/" />}
        />
        <Route
          path="/taxi-party-chat"
          element={
            isLoggedIn ? (
              <TaxiPartyChat userName={userName} userEmail={userEmail} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/mypage"
          element={
            isLoggedIn ? (
              <MyPage
                setIsLoggedIn={setIsLoggedIn}
                userName={userName}
                handleLogout={handleLogout}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/edit-profile"
          element={
            isLoggedIn ? (
              <EditProfile setCurUserName={setUserName} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/google-redirect"
          element={<GoogleRedirect setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {isLoggedIn && disappearNavBar && (
        <NavBar
          navActive={navActive}
          setNavActive={setNavActive}
          navChage={navChage}
          setNavChange={setNavChange}
        />
      )}
    </div>
  )
}

export default App
