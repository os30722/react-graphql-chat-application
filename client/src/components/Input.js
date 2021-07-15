import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { selectUsername } from '../store/userSlice';

const SEND_MESSAGE = gql`
  mutation SendMessage($name: String!, $content: String!){
    sendMessage(name: $name, content: $content)
  }
`;

function Input() {
    
    const userName = useSelector(selectUsername);
    const [text, setText] = useState('');
    const [sendMessage] = useMutation(SEND_MESSAGE);

    const handleSubmit = () => {
        sendMessage({
            variables: {
                name: userName,
                content: text,
            }
        });
        setText('');
    }

    return (
        <div className='chat_footer'>
            <input
                className='chat_input'
                type='text'
                placeholder='Type a message'
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button
                className='send_button'
                type='button' 
                onClick={handleSubmit} >
                Send
            </button>
        </div>
    )
}

export default Input;
