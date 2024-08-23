import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import { NavTaxiGray, NavTaxiGreen, NavSearchGray, NavSearchGreen, NavUserGray, NavUserGreen } from "../../assets/navBar";
import './NavBar.css';

function NavBar() {
    const location = useLocation();
    const [navActive, setNavActive] = useState(location.pathname === '/taxi-party-list' ? 'list' : location.pathname === '/mypage' ? 'search' : 'home');

    useEffect(() => {
        console.log(location.pathname);
        setNavActive(location.pathname === '/taxi-party-list' ? 'list' : location.pathname === '/mypage' ? 'search' : location.pathname === '/' ? 'home' : navActive);
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