import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_COMMENT } from '../../graphql/mutations';
import { ResetIcon, UploadIcon } from '../../assets/chat';
import './ChatInput.css'

function ChatInput({ taxiPartyId, refetch }) {
    const [createComment] = useMutation(CREATE_COMMENT);
    const [content, setContent] = useState('');

    const handleCreateComment = async (e) => {
        if (!content) return;
        try {
            const sendTime = new Date().toISOString();
            const result = await createComment({ variables: { CreateCommentInput: { 
                sendTime: sendTime,
                content: content,
                taxiPartyId: taxiPartyId } 
            }});
            console.log("createComment result : ", result);
            setContent('');
            refetch();
        } catch (err) {
            console.error("createComment err : ", err);
        }
    }

    const handleInputKeyUp = (e) => {
        if (e.key === 'Enter') {
            handleCreateComment();
        }
    }

    return (
        <div id='chat-bottom-wrapper'>
            <ResetIcon onClick={() => refetch()} />
            <input type="text" placeholder="메시지를 입력하세요" onChange={(e) => setContent(e.target.value)} value={content} onKeyUp={handleInputKeyUp} />
            <UploadIcon onClick={handleCreateComment} />
        </div>
    );
}

export default ChatInput;