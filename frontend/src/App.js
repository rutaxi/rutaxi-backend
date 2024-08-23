import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import { useLocation } from 'react-router-dom';
import { CreateTaxiParty, EditProfile, Main, MyPage, TaxiPartyChat, TaxiPartyDetail, TaxiPartyList } from './pages';
import NavBar from './components/navBar/NavBar';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false);
  const [userName, setUserName] = useState(localStorage.getItem('userName') ? localStorage.getItem('userName') : '');
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') ? localStorage.getItem('userEmail') : '');

  const location = useLocation();
  const disappearNavBar = !(location.pathname === '/taxi-party-chat' || location.pathname === '/edit-profile');

  const [navActive, setNavActive] = useState(location.pathname === '/taxi-party-list' ? 'list' : location.pathname === '/mypage' ? 'search' : 'home');
  const [navChage, setNavChange] = useState(false);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} setUserEmail={setUserEmail} />} />
        <Route path='/taxi-party-list' element={<TaxiPartyList />} />
        <Route path='/taxi-party-detail' element={<TaxiPartyDetail userName={userName} />} />
        <Route path='/create-taxi-party' element={<CreateTaxiParty />} />
        <Route path='/taxi-party-chat' element={<TaxiPartyChat userName={userName} userEmail={userEmail} />} />
        <Route path='/mypage' element={<MyPage setIsLoggedIn={setIsLoggedIn} userName={userName} />} />
        <Route path='/edit-profile' element={<EditProfile setCurUserName={setUserName} />} />
      </Routes>
      {isLoggedIn && disappearNavBar && <NavBar navActive={navActive} setNavActive={setNavActive} navChage={navChage} setNavChange={setNavChange} />}
    </div>
  );
}

export default App;
