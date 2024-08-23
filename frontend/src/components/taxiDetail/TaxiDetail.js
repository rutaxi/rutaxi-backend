import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useMutation } from '@apollo/client';
import { JOIN_IN_TAXI_PARTY, LEAVE_TAXI_PARTY } from '../../graphql/mutations';
import { RemainSeat, TaxiTitle, TaxiInfo } from '.';
import './TaxiDetail.css';

function TaxiDetail({ userName }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [joinInTaxiParty] = useMutation(JOIN_IN_TAXI_PARTY);
    const [leaveTaxiParty] = useMutation(LEAVE_TAXI_PARTY);

    const [taxiParty, setTaxiParty] = useState(location.state.taxiParty);
    const { id, isNotmalTaxi, startLocation, endLocation, users } = taxiParty;
    const [rideTogether, setRideTogether] = useState(users.some(user => user.userName === userName));
    const taxiTitle = `${startLocation.address}에서 ${endLocation.address}로`

    const [changeCnt, setChangeCnt] = useState(0);
    const handleGoBack = () => {
        navigate(-1);
    }

    const handleRideTogetherBtn = async () => {
        try {
            const result = await joinInTaxiParty({ variables: { taxiPartyId: id } });
            console.log("ride result : ", result);
            setTaxiParty(result.data.joinInTaxiParty)
            setRideTogether(true);
            setChangeCnt(0);
        } catch (err) {
            console.error("ride err : ", err);
        }
    }

    const handleLeaveTaxiParty = async () => {
        try {
            const result = await leaveTaxiParty({ variables: { taxiPartyId: id } });
            console.log("leave result : ", result);
            setRideTogether(false);
            setChangeCnt(-1);
            if(users.length == 1) {
                navigate('/', { state: { isDeleted: true } });
            }
            // navigate('/taxi-party-list');
        } catch (err) {
            console.error("leave err : ", err);
        }
    }

    return (
        <div id="taxi-party-detail-box">
            <div id="taxi-party-detail-top">
                <div>
                    {/* 여석 정보 */}
                    <RemainSeat usersCnt={users.length + changeCnt} seatCnt={isNotmalTaxi ? 4 : 9} />
                    {/* 택시팟 이름 및 유형 */}
                    <TaxiTitle title={taxiTitle} type={isNotmalTaxi ? "일반택시" : "대형택시"} />
                </div>

                {/* 동승 및 문의, 취소 버튼 */}
                {rideTogether ? 
                    <div id='taxi-party-detail-btn-ride'>
                        <Link to='/taxi-party-chat' state={{ taxiPartyId : id, taxiParty : taxiParty }}><TaxiBtn>문의하기</TaxiBtn></Link>
                        <TaxiBtn className='taxi-btn-cancle' onClick={handleLeaveTaxiParty}>취소하기</TaxiBtn>
                    </div>
                    : <TaxiBtn onClick={handleRideTogetherBtn}>동승하기</TaxiBtn> }
            </div>

            {/* 택시팟 위치, 시간 정보 */}
            <TaxiInfo taxiParty={taxiParty} />
        </div>
    )
}

export default TaxiDetail;

function TaxiBtn({ children, onClick, className }) {
    return (
        <div id='taxi-party-detail-btn' onClick={onClick} className={`${className ? className : null}`}>{children}</div>
    )
}
