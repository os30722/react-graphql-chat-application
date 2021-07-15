import React from 'react'

const ChatBubble = ({ message, userName }) => {
    
    return (
        <div  style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '0.5em',
            alignItems: message.name === userName ? 'flex-end' : 'flex-start',

        }} >
            <div className={ message.name === userName ? 'reciever_bubble' : 'sender_bubble'}>{message.content}</div>
            <div className='info'>from {message.name}</div>
        </div>
    )
}

export default ChatBubble;
