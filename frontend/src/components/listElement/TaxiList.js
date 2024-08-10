import { Link } from 'react-router-dom';
import './TaxiList.css'

function TaxiList({ taxiPartyList }) {
    return (
        <div id="main-content-list" className="main-content-taxi-list">
            {taxiPartyList && taxiPartyList.map((taxiParty, index) => {
                return <TaxiElem key={index} taxiParty={taxiParty} />
            })}
        </div>
    );
}

export default TaxiList;

function TaxiElem({ taxiParty }) {
    const { name, startTime, isNotmalTaxi, startLocation, endLocation, taxiPartyTags, users } = taxiParty;

    // 이름 형식 맞추기
    const taxiTitle = `${startLocation.address}에서 ${endLocation.address}로`

    // 시간 형식 맞추기
    const startTimeDate = new Date(startTime);
    const startDateFormat = `${startTimeDate.getFullYear().toString().slice(2, 4)}/${startTimeDate.getMonth() + 1 < 10 ? `0${startTimeDate.getMonth() + 1}` : startTimeDate.getMonth() + 1}/${startTimeDate.getDate() < 10 ? `0${startTimeDate.getDate()}` : startTimeDate.getDate()}(${['월', '화', '수', '목', '금', '토', '일'][startTimeDate.getDay()]})`;
    const startTimeFormat = `${startTimeDate.getHours() < 10 ? `0${startTimeDate.getHours()}` : startTimeDate.getHours()}:${startTimeDate.getMinutes()}`;

    const taxiRemainPersent = users.length / (isNotmalTaxi ? 4 : 9) * 100;

    return (
        <div className="main-taxi-elem">
            <Link to="/taxi-party-detail" state={{taxiParty : taxiParty}}>
                <div className="main-taxi-time">
                    {/* 택시 이름 및 여유 상태 */}
                    <div className="main-taxi-name">
                        <div className={`main-taxi-color ${taxiRemainPersent === 100 ? "remain-red" : (taxiRemainPersent >= 50 ? "remain-yellow" : null)}`}></div>
                        <span>{name}</span>
                    </div>

                    {/* 출발 시간 */}
                    <div>{startDateFormat} <b>{startTimeFormat}</b> 출발 예정</div>
                </div>

                <div className="main-taxi-title">{taxiTitle}</div>
                <div className="main-taxi-detail">
                    <div className="main-taxi-type-wrapper">
                        {/* 택시 타입 */}
                        <TaxiType taxiType={isNotmalTaxi ? "normal" : "share"}>{isNotmalTaxi ? '일반택시' : '대형택시'}</TaxiType>
                        {taxiPartyTags.map((tag, index) => {
                            return <TaxiType taxiType="etc" key={index}><span>{tag.name === '시간준수' ? "⏰  " : "🤫  "}</span>{tag.name}</TaxiType>
                        })}
                    </div>

                    {/* 택시 인원 */}
                    <div className="main-taxi-cnt">{users.length}/{isNotmalTaxi ? '4' : '9'}</div>
                </div>
            </Link>
        </div>
    );
}

function TaxiType({ children, taxiType }) {
    return (
        <div className={`taxi-type ${taxiType ? "taxi-type-"+taxiType : null}`}>
            {taxiType !== "etc" && <div className="taxi-type-color"></div>}
            <div>{children}</div>
        </div>
    );
}