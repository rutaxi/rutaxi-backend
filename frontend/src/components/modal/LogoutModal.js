import { useNavigate } from "react-router-dom";
import { XIcon } from "../../assets/modal";
import './LogoutModal.css';

function LogoutContent({ closeModal, setIsLoggedIn }) {
    const navigate = useNavigate();
    const goToMain = () => {
        navigate('/');
    }

  return (
    <div>
        <XIcon id="x-icon" onClick={closeModal} />
        <div id='logout-content'>
            <h2 id="modal-title" className="modal-logout-title">정말 로그아웃 하시겠습니까? 🥹</h2>
            <div id='logout-btns'>
                <div id="logout-yes" onClick={() => {
                    localStorage.removeItem('token');
                    setIsLoggedIn(false);
                    closeModal();
                    goToMain();
                }}>예</div>
                <div id="logout-no" onClick={closeModal}>아니오</div>
            </div>
        </div>
    </div>
  );
}

export default LogoutContent;