import React from "react";
import { Modal } from "../../components/modal";
import './LogoutBtn.css';

function LogoutBtn({ setIsLoggedIn }) {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function handleLogoutClick() {
        setIsOpen(true);
    }

    return (
        <>
        <div id="mypage-logout-btn" onClick={handleLogoutClick}>로그아웃</div>
        <Modal
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
            setIsLoggedIn={setIsLoggedIn}
            type="logout" />
        </>
    )
}

export default LogoutBtn;