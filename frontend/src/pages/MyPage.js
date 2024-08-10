import React from "react";
import './MyPage.css';
import { LogoutBtn, UserInfo } from "../components/mypage";

function MyPage({ setIsLoggedIn, userName }) {
    return (
        <div id="mypage-wrapper">
            <h2>My Page</h2>

            {/* 사용자 정보 */}
            <UserInfo userName={userName} />

            {/* 구분선 */}
            <hr id="mypage-hr" />

            {/* 로그아웃 버튼 */}
            <LogoutBtn setIsLoggedIn={setIsLoggedIn} />
        </div>
    );
}

export default MyPage;