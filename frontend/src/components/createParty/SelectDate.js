import React, { forwardRef } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import './SelectDate.css';

registerLocale('ko', ko);

function SelectDate({ selectedDate, setSelectedDate}) {
  return (
    <DatePicker
        className='select-taxi-time'
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={1}
        timeCaption="time"
        locale="ko"
        dateFormat="yyyy년 MM월 dd일 HH시 mm분"
        placeholderText="출발 시간"
        customInput={<CustomInput />}
    />
  );
}

export default SelectDate;

const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="select-taxi-time select-taxi-detail-select" onClick={onClick} ref={ref}>
        {value ? <span>출발시간&nbsp;&nbsp;</span> : '출발시간' }
        {value ? `${value}` : ''}
    </div>
));