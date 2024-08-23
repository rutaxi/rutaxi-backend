import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { NavTaxiGray, NavTaxiGreen, NavSearchGray, NavSearchGreen, NavUserGray, NavUserGreen } from "../../assets/navBar";
import './NavBar.css';

function NavBar({ navActive, setNavActive, navChage, setNavChange }) {
    const location = useLocation();

    useEffect(() => {
        if(location.pathname === '/taxi-party-list' || location.pathname === '/mypage' || location.pathname === '/') {
            setNavActive(location.pathname === '/taxi-party-list' ? 'list' : location.pathname === '/mypage' ? 'search' : location.pathname === '/' ? 'home' : navActive);
        }
    }, [navChage]);

    useEffect(() => {
        if(location.pathname === '/taxi-party-list' || location.pathname === '/mypage' || location.pathname === '/') {
            setNavChange(!navChage);
        }
    }, [location]);

    return (
        <nav id="nav-bar-wrapper">
            <NavBarElem to='/taxi-party-list' setNavActive={setNavActive} activeElem='list'>
                {navActive === 'list' ? <NavSearchGreen className="nav-selected" /> : <NavSearchGray />}
            </NavBarElem>
            <NavBarElem to='/' setNavActive={setNavActive} activeElem='home'>
                {navActive === 'home' ? <NavTaxiGreen className="nav-selected" /> : <NavTaxiGray />}
            </NavBarElem>
            <NavBarElem to='/mypage' setNavActive={setNavActive} activeElem='search'>
                {navActive === 'search' ? <NavUserGreen className="nav-selected" /> : <NavUserGray />}
            </NavBarElem>
        </nav>
    );
}

export default NavBar;

function NavBarElem({ to, children, setNavActive, activeElem }) {
    return (
        <Link to={to} onClick={() => setNavActive(activeElem)}>{children}</Link>
    );
}