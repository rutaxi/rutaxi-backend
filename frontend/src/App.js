import React, { useState } from 'react';
import { Route, Routes } from 'react-router';
import { useLocation } from 'react-router-dom';
import { CreateTaxiParty, EditProfile, Main, MyPage, TaxiPartyChat, TaxiPartyDetail, TaxiPartyList } from './pages';
import NavBar from './components/navBar/NavBar';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false);
  const [userName, setUserName] = useState(localStorage.getItem('userName') ? localStorage.getItem('userName') : '');

  const location = useLocation();
  const disappearNavBar = !(location.pathname === '/taxi-party-chat' || location.pathname === '/edit-profile');

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} />} />
        <Route path='/taxi-party-list' element={<TaxiPartyList />} />
        <Route path='/taxi-party-detail' element={<TaxiPartyDetail userName={userName} />} />
        <Route path='/create-taxi-party' element={<CreateTaxiParty />} />
        <Route path='/taxi-party-chat' element={<TaxiPartyChat userName={userName} />} />
        <Route path='/mypage' element={<MyPage setIsLoggedIn={setIsLoggedIn} userName={userName} />} />
        <Route path='/edit-profile' element={<EditProfile setCurUserName={setUserName} />} />
      </Routes>
      {isLoggedIn && disappearNavBar && <NavBar />}
    </div>
  );
}

export default App;
