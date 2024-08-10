import { Link } from "react-router-dom";
import { useState } from 'react';
import { CircleGray, CircleGreen, HomeGray, HomeGreen, SearchGray, SearchGreen } from "../../assets/navBar";
import './NavBar.css';

function NavBar() {
    const [navActive, setNavActive] = useState('home');

    return (
        <nav id="nav-bar-wrapper">
            <NavBarElem to='/taxi-party-list' setNavActive={setNavActive} activeElem='list'>
                {navActive === 'list' ? <HomeGreen className="nav-selected" /> : <HomeGray />}
            </NavBarElem>
            <NavBarElem to='/' setNavActive={setNavActive} activeElem='home'>
                {navActive === 'home' ? <CircleGreen className="nav-selected" /> : <CircleGray />}
            </NavBarElem>
            <NavBarElem to='/mypage' setNavActive={setNavActive} activeElem='search'>
                {navActive === 'search' ? <SearchGreen className="nav-selected" /> : <SearchGray />}
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