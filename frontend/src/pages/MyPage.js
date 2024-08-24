import React, { useEffect } from "react";
import { useQuery } from '@apollo/client';
import { FETCH_USER } from '../graphql/queries';
import './MyPage.css';
import { LogoutBtn, UserInfo } from "../components/mypage";

function MyPage({ setIsLoggedIn, handleLogout }) {
    const { loading, error, data, refetch } = useQuery(FETCH_USER);
    const [userName, setUserName] = React.useState(localStorage.getItem('userName'));

    useEffect(() => {
        refetch();
        if (data) {
            setUserName(data.fetchUser.userName);
            console.log("setUserName : ", data);
            localStorage.setItem('userName', data.fetchUser.userName);
        }
    }, []);

    return (
        <div id="mypage-wrapper">
            <h2>My Page</h2>

            {/* 사용자 정보 */}
            <UserInfo userName={userName} />

            {/* 구분선 */}
            <hr id="mypage-hr" />

            {/* 로그아웃 버튼 */}
            <LogoutBtn handleLogout={handleLogout} setIsLoggedIn={setIsLoggedIn} />
        </div>
    );
}

export default MyPage;