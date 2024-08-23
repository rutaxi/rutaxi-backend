import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CreateForm, CreateNav, CreateMap } from '../components/createParty';
import './CreateTaxiParty.css';
import { useNavigate } from 'react-router';
import { CREATE_PARTY_MUTATION } from '../graphql/mutations';

function CreateTaxiParty() {
    const [name, setName] = React.useState('')
    const [taxiType, setTaxiType] = React.useState('')
    const [taxiPartyTags, setTaxiPartyTags] = React.useState([])
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentPosition, setCurrentPosition] = useState(null);
    const [startLocation, setStartLocation] = useState(null);
    const [endLocation, setEndLocation] = useState(null);

    const navigate = useNavigate();
    
    const [createParty] = useMutation(CREATE_PARTY_MUTATION);
    const isVaild = name && selectedDate && taxiType && startLocation && endLocation;

    const handleCreateParty = async () => {
        try {
            const result = await createParty({
                variables: {
                    createTaxiPartyInput: {
                        name,
                        startTime: selectedDate,
                        isNotmalTaxi: taxiType === 'normal',
                        startLocation,
                        endLocation,
                        taxiPartyTags
                    }
                }
            });
            console.log('Create party successful:', result);
            navigate('/taxi-party-list', { state : { isCreated: true } });
        } catch (err) {
            console.error('Error creating party:', err);
        }
    }

    const handleCreatePartyBtn = () => {
        if(!isVaild) return alert('모든 항목을 입력해주세요');
        handleCreateParty();
    }

    return (
        <div id='create-taxi-party-wrapper'>
            {/* 택시 파티 만들기 네비게이션 */}
            <CreateNav handleCreateParty={handleCreatePartyBtn} />

            {/* 택시 파티 만들기 입력폼 */}
            <CreateForm
                setSelectedTag={setTaxiPartyTags}
                setPartyName={setName}
                setStartPosition={setStartLocation}
                setEndPosition={setEndLocation}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                setTaxiType={setTaxiType}
                taxiType={taxiType}
                selectedTag={taxiPartyTags}
            />

            {/* 택시 파티 만들기 지도 화면 */}
            <CreateMap
                currentPosition={currentPosition}
                startPosition={startLocation}
                endPosition={endLocation}
                setCurrentPosition={setCurrentPosition}
            />
        </div>
    );
}

export default CreateTaxiParty;

