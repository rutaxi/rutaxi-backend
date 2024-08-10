import { GreenCar } from '../../assets/chat';
import './ChatList.css'

function ChatList({ data, userName, chatContainerRef }) {
    return (
        <div id='chat-contents-wrapper' ref={chatContainerRef}>
            {data?.map((chat, index) => (
                <ChatElem chat={chat} key={index} userName={userName} />
            ))}
        </div>
    );
}

export default ChatList;

function ChatElem({ chat, key, userName }) {
    const formattedMessage = chat.content ? chat.content.split('\n').map((line, index) => (
        <span key={index}>
        {line}
        <br />
        </span>
    )) : null;

    const type = chat.writer?.userName === userName ? 'user' : 'bot';

    return (
        <div className={`chat-elem-wrappers ${type}`}>
            {type === 'bot' && <GreenCar />}
            {/* {chat.type === 'bot2' && <BlueCar />} */}
            <div className='chat-elems-name-wrapper'>
                <div className='chat-elems-names'>gyugyu</div>
                <div className={`chat-elems ${type}`}>
                    {formattedMessage}
                </div>
            </div>
        </div>
    );
}
