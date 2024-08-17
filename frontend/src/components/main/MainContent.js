import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { MY_TAXI_PARTIES, FETCH_USER } from '../../graphql/queries';
import { TaxiList } from "../listElement";
import './MainContent.css';

function MainContent({setUserName}) {
    const { loading, error, data, refetch } = useQuery(MY_TAXI_PARTIES);
    const { data: userData } = useQuery(FETCH_USER);
    const [myPartyList, setMyPartyList] = React.useState([]);
    
    useEffect(() => {
        if (userData) {
            setUserName(userData.fetchUser.userName);
            console.log("setUserName : ", userData);
            localStorage.setItem('userName', userData.fetchUser.userName);
        }
    }, [userData]);

    useEffect(() => {
        // fetchMyTaxiParties
        refetch();
        if (data) {
            setMyPartyList(data.fetchMyTaxiParties);
            console.log("mypartylist : ", data.fetchMyTaxiParties);
        }
    }, [data]);

    return (
        <div id="main-content-wrapper">
            {/* 커뮤니티 리스트 */}
            {/* <div id="main-title-and-user">
                <h2>Community</h2>
                <UserIcon />
            </div>
            <div className="main-description">나의 택시 커뮤니티를 확인하세요!</div>
            <CommunityList />
            <hr /> */}

            {/* 택시팟 리스트 */}
            <h2>Taxi Soon</h2>
            <div className="main-description">가입한 택시팟을 확인하세요!</div>
            <TaxiList taxiPartyList={myPartyList} />
        </div>
    );
}

export default MainContent;