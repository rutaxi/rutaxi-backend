import { LocationIcon, ClockIcon, QuestionIcon } from '../../assets/taxiDetail';
import './TaxiInfo.css';

function TaxiInfo({ taxiParty }) {
    const { startTime, startLocation, endLocation } = taxiParty;
    // 출발 날짜
    const date = new Date(startTime);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = date.getDay();
    const dayOfWeekStr = ['일', '월', '화', '수', '목', '금', '토'][dayOfWeek];
    const startDate = `${year}년 ${month}월 ${day}일 ${dayOfWeekStr}요일`;
    // 출발 시간
    const hour = date.getHours();
    const minute = date.getMinutes();
    const startTimeStr = `${hour < 12 ? '오전' : '오후'} ${hour == 0 ? 12 : hour > 13 ? hour - 12 : hour}시 ${minute}분`;

    return (
        <div id='taxi-party-detail-infos'>
            {/* 위치 정보 */}
            <DetailInfo title="출발지" subtitle={startLocation.address} description={locationList.find(location => location.name === startLocation.address)?.address} />
            <DetailInfo title="목적지" subtitle={endLocation.address} description={locationList.find(location => location.name === endLocation.address)?.address} />
            
            {/* 시간 정보 */}
            <div id='taxi-party-detail-bottom-wrapper'>
                <DetailInfo title="탑승시간" subtitle={startTimeStr} description={startDate} type="time" />
                {/* <QuestionIcon id='taxi-party-detail-question-mark' /> */}
            </div>
        </div>
    )
}

export default TaxiInfo;

function DetailInfo({ title, subtitle, description, type }) {
    return (
        <div className='taxi-party-detail-info'>
            {type && type === 'time' ? <ClockIcon /> : <LocationIcon />}
            <div>
                <div className='taxi-party-detail-info-title-wrapper'>
                    <span
                        id={`${type && type === 'time' ? 'taxi-party-detail-info-time-title' : null}`} 
                        className='taxi-party-detail-info-titles'>{title}</span>
                    <span>{subtitle}</span>
                </div>
                <div className='taxi-party-detail-info-contents'>{description}</div>
            </div>
        </div>
    )
}

const locationList = [
    {
        name: '다이소 충남보령점',
        address: '충청남도 보령시 동대동 1681 다이소 충남보령점',
        lat: 36.3485999,
        lng: 126.6051051
    },
    {
        name: '보령 종합터미널',
        address: '충청남도 보령시 터미널길 8 보령 종합터미널',
        lat: 36.34248,
        lng: 126.5891
    },
    {
        name: '보령 대천역',
        address: '충청남도 보령시 내항동 337 보령 대천역',
        lat: 36.3416374,
        lng: 126.5866877
    },
    {
        name: '대천해수욕장',
        address: '대천해수욕장',
        lat: 36.30559,
        lng: 126.5161
    },
    {
        name: '향천리길 268',
        address: '충청남도 보령시 청라면 향천리길 268',
        lat: 36.37547,
        lng: 126.6478
    },
    {
        name: '명보시네마',
        address: '충청남도 보령시 중앙로 125 명보시네마',
        lat: 36.35200,
        lng: 126.5906
    },
    {
        name: '명륜진사갈비 보령대천점',
        address: '충청남도 보령시 대천로 명륜진사갈비',
        lat: 36.35565,
        lng: 126.6039
    }
]