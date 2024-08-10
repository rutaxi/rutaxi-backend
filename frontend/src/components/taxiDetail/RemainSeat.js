import { CarGreen, CarGray } from '../../assets/taxiDetail';
import './RemainSeat.css';

function RemainSeat({ usersCnt, seatCnt }) {
    return (
        <div id='taxi-party-detail-cars'>
            {Array.from({ length: seatCnt }, (v, i) => i).map((_, index) => {
                return index < usersCnt ? <CarGreen key={index} /> : <CarGray key={index} />;
            })}
        </div>
    )
}

export default RemainSeat;