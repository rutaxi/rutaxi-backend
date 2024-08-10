import { Link } from "react-router-dom";
import './EditProfileNav.css';

function EditProfileNav({ handleUpdateUser }) {
    return (
        <div id="edit-profile-nav">
            <Link to="/mypage" id="edit-cancle-btn">취소</Link>
            <div>프로필 수정하기</div>
            <div id="edit-save-btn" onClick={handleUpdateUser}>저장</div>
        </div>
    )
}

export default EditProfileNav;