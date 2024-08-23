import { Link } from "react-router-dom";
import { GrayCar } from "../../assets/chat";
import './UserInfo.css';

function UserInfo({ userName }) {
    return (
        <div id="mypage-user-info">
            <div id="mypage-edit-svg">
                <GrayCar />
                {/* <Link to="/edit-profile">
                    <div id="mypage-edit-btn">프로필 수정하기</div>
                </Link> */}
            </div>
            <div id="mypage-user-name">{userName}</div>
        </div>
    )
}

export default UserInfo;