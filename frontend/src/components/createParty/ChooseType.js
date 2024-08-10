import './ChooseType.css';

function ChooseType({ setTaxiType, taxiType, setSelectedTag, selectedTag }) {
    const handleSelectTag = (tag) => {
        setSelectedTag((prev) => {
            if (prev.includes(tag)) return prev.filter((t) => t !== tag);
            else return [...prev, tag];
        })
    }

    return (
        <>
            <ChooseTypeElem type="type" setTaxiType={setTaxiType} taxiType={taxiType} />
            <ChooseTypeElem type="tag" handleSelectTag={handleSelectTag} selectedTag={selectedTag} />
        </>
    );
}

export default ChooseType;

function ChooseTypeElem({ type, setTaxiType, taxiType, handleSelectTag, selectedTag }) {
    return (
        <div className='choose-taxi-type'>
            {type === 'type' ? '택시 종류 |' : '태그 선택 |'}
            {type === 'type' ?
                <>
                    <ChooseTag className={taxiType=='normal' ? 'selected' : null} onClick={() => setTaxiType('normal')}>🚖 일반 택시</ChooseTag>
                    <ChooseTag className={taxiType=='large' ? 'selected' : null} onClick={() => setTaxiType('large')}>🚕 대형 택시</ChooseTag>
                </> :
                <>
                    <ChooseTag onClick={() => handleSelectTag("조용하게")} className={selectedTag.includes('조용하게') ? 'selected' : ''}>🤫 조용히 가고 싶어요</ChooseTag>
                    <ChooseTag onClick={() => handleSelectTag("시간준수")}  className={selectedTag.includes('시간준수') ? 'selected' : ''}>⏰ 시간을 잘 지켜요</ChooseTag>
                </>}
        </div>
    );
}

function ChooseTag({ children, onClick, className }) {
    return (
        <div className={`choose-tag ${className}`} onClick={onClick}>{children}</div>
    );
}
