import { SelectDate, SelectPosition, ChooseType } from '.';
import 'react-datepicker/dist/react-datepicker.css';
import './CreateForm.css';
  
function CreateForm({ setPartyName, setStartPosition, setEndPosition, setSelectedDate, setTaxiType, taxiType, selectedTag, setSelectedTag, selectedDate}) {
    return (
        <div id='create-taxi-party-form'>
            {/* 택시 파티 이름 입력 */}
            <input type="text" placeholder="택시 파티 이름" onChange={(e) => setPartyName(e.target.value)} />

            {/* 출발지, 도착지 선택 */}
            <SelectPosition setStartPosition={setStartPosition} setEndPosition={setEndPosition} />

            {/* 출발시간, 날짜 선택 */}
            <SelectDate selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

            {/* 택시 종류, 태그 선택 */}
            <ChooseType setTaxiType={setTaxiType} taxiType={taxiType} setSelectedTag={setSelectedTag} selectedTag={selectedTag} />            
        </div>
    );
}

export default CreateForm;


