import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_TAXI_PARTY } from '../graphql/queries';
import { TaxiList } from "../components/listElement";
import { AddIcon } from "../assets/taxiPartyList";
import './TaxiPartyList.css'
import { Link, useLocation } from 'react-router-dom';
import { Modal } from '../components/modal';

function TaxiPartyList() {
    const { loading, error, data, refetch } = useQuery(ALL_TAXI_PARTY);
    const [taxiPartyList, setTaxiPartyList] = React.useState([]);

    const location = useLocation();
    const { isCreated } = location.state || false;
    const [isModalOpen, setIsModalOpen] = React.useState(isCreated);

    useEffect(() => {
        refetch();
        if (data) {
            setTaxiPartyList(data.fetchAllTaxiParty);
        }
    }, [data]);

    return (
        <div id="taxi-party-list-wrapper">
            {/* 택시팟 리스트 타이틀 */}
            <div id="taxi-party-list-subtitle">
                <div>97여단</div>
                <Link to="/create-taxi-party"><AddIcon /></Link>
            </div>
            <h2>Taxi Party</h2>
            <div id="taxi-party-list-description">택시를 같이 탈 파티원을 모집하세요!</div>

            {/* 택시팟 검색창 */}
            {/* <div id="taxi-party-list-search">
                <SearchIcon />
            </div> */}

            {/* 택시팟 리스트 */}
            <TaxiList taxiPartyList={taxiPartyList}  />

            <Modal 
                modalIsOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                type="create"
            />
        </div>
    );
}

export default TaxiPartyList;