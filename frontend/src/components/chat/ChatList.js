import { GreenCar } from '../../assets/chat';
import './ChatList.css'

function ChatList({ data, userName, chatContainerRef, userEmail }) {
    return (
        <div id='chat-contents-wrapper' ref={chatContainerRef}>
            {data?.map((chat, index) => (
                <ChatElem chat={chat} key={index} userName={userName} userEmail={userEmail} />
            ))}
        </div>
    );
}

export default ChatList;

function ChatElem({ chat, key, userName, userEmail }) {
    const formattedMessage = chat.content ? chat.content.split('\n').map((line, index) => (
        <span key={index}>
        {line}
        <br />
        </span>
    )) : null;

    console.log('chat elem :', chat);
    console.log('chat elem :', chat.writer?.email);
    console.log('chat elem :', userEmail);

    const type = chat.writer?.email === userEmail ? 'user' : 'bot';

    return (
        <div className={`chat-elem-wrappers ${type}`}>
            {type === 'bot' && <GreenCar />}
            {/* {chat.type === 'bot2' && <BlueCar />} */}
            <div className='chat-elems-name-wrapper'>
                {type === 'bot' && <div className='chat-elems-names'>{chat.writer.userName}</div>}
                <div className={`chat-elems ${type}`}>
                    {formattedMessage}
                </div>
            </div>
        </div>
    );
}
