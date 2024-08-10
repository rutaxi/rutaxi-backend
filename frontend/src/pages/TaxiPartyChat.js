import { useQuery } from '@apollo/client';
import { COMMENTS } from '../graphql/queries';
import { useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import './TaxiPartyChat.css';
import { ChatInput, ChatList, ChatNav } from '../components/chat';

function TaxiPartyChat({ userName }) {
  const chatContainerRef = useRef(null);

  const location = useLocation();
  const [taxiPartyId, setTaxiPartyId] = useState(location.state.taxiPartyId);
  const [taxiParty, setTaxiParty] = useState(location.state.taxiParty);

  const { loading, error, data, refetch } = useQuery(COMMENTS, {
    variables: { taxiPartyId },
    // pollInterval: 1000,
  });

  useEffect(() => {
    if(chatContainerRef.current) chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [data]);
  console.log('taxi party chat list :', data);

  return (
    <div id="taxi-party-chat-wrapper">
        {/* 채팅 화면 네비바 */}
        <ChatNav taxiParty={taxiParty} />

        {/* 채팅 내역 */}
        <ChatList data={data ? data.fetchComments : null} userName={userName} chatContainerRef={chatContainerRef} />

        {/* 채팅 입력 및 버튼 */}
        <ChatInput taxiPartyId={taxiPartyId} refetch={refetch} />
    </div>
  );
}

export default TaxiPartyChat;