import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LeftIcon, QuestionIcon } from '../../assets/chat';
import { Army97 } from '../../assets/logo';
import './ChatNav.css'
import { Modal } from '../modal';

function ChatNav() {
    const location = useLocation();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [taxiParty, setTaxiParty] = React.useState(location.state.taxiParty);

    function handleQuestionClick() {
        setIsOpen(true);
    }

    return (
        <div id="taxi-party-chat-nav">
            {/* 이전 버튼 */}
            <Link to="/taxi-party-detail" state={{taxiParty : taxiParty}}><LeftIcon /></Link>

            {/* 택시팟 정보 */}
            <div id='taxi-party-title-wrapper'>
                <Army97 />
                <div id='taxi-party-title-contents'>
                    <div id='chat-taxi-community'>97 여단</div>
                    <div id='chat-taxi-title'>보령 터미널에서 다이소로</div>
                    <div id='chat-taxi-type'>
                        <TaxiType taxiType="normal">일반택시</TaxiType>
                    </div>
                </div>
            </div>

            {/* 도움말 버튼 */}
            <QuestionIcon onClick={handleQuestionClick} />
            <Modal
                modalIsOpen={modalIsOpen} 
                setIsOpen={setIsOpen} />
        </div>
    );
}

export default ChatNav;

function TaxiType({ children, taxiType }) {
    return (
        <div className={`taxi-type ${taxiType ? "taxi-type-"+taxiType : null}`}>
            {taxiType !== "etc" && <div className="taxi-type-color"></div>}
            <div>{children}</div>
        </div>
    );
}