import Select from 'react-select';
import './SelectPosition.css';

function SelectPosition({ setStartPosition, setEndPosition}) {
    return (
        <>
            <SelectElem type='start' setPosition={setStartPosition} />
            <SelectElem type='end' setPosition={setEndPosition} />
        </>
    );
}

export default SelectPosition;

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

function SelectElem({ type, setPosition }) {
    return (
        <Select
            className='select-taxi-detail-select'
            options={locationList}
            getOptionLabel={(option) => <>{option.name}<div>{option.address}</div></>}
            getOptionValue={(option) => option.name}
            onChange={(e) => setPosition({ address: e.name, lat: e.lat, lng: e.lng })}
            components={{ 
                SingleValue: (type === 'start' ? customSingleValueStart : customSingleValueEnd), 
                Option: customOptions ,
            }}
            placeholder={type === 'start' ? "출발지" : "도착지"}
            styles={customStyles}
        />
    );
}

const customSingleValueStart = ({ data }) => (
    <div className='custom-single-wrapper'>
        <div><span>출발지&nbsp;&nbsp;</span>{data.name}</div>
    </div>
)

const customSingleValueEnd = ({ data }) => (
    <div className='custom-single-wrapper'>
        <div><span>도착지&nbsp;&nbsp;</span>{data.name}</div>
    </div>
)

const customOptions = (props) => (
    <div {...props.innerProps} className='custom-options'>
        <div className='options-name'>{props.data.name}</div>
        <div className='options-address'>{props.data.address}</div>
    </div>
)

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        padding: '0px',
        height: '2.4em',
        minHeight: 'wrap-content',
        borderColor: state.isFocused ? '#B7B7B7' : provided.borderColor,
        boxShadow: state.isFocused ? '0 0 0 1px #B7B7B7' : provided.boxShadow,
        '&:hover': {
        borderColor: state.isFocused ? '#B7B7B7' : provided.borderColor, 
        },
    }),
    placeholder: (defaultStyles) => {
        return {
            ...defaultStyles,
            paddingTop: '0.1em',
            marginLeft: '-0.01em',
        }
    },
    indicatorSeparator: (provided, state) => ({
        ...provided,
        display: 'none',
    }),
    dropdownIndicator: (provided, state) => ({
        ...provided,
        padding: '0px',
        padding: '4px 8px',
    }),
    menu: (provided, state) => ({
      ...provided,
      marginTop: '3px'
    }),
};