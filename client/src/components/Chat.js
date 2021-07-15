import React, { useEffect } from 'react'
import { useQuery, gql } from '@apollo/client';
import { useSelector } from 'react-redux';
import { selectUsername } from '../store/userSlice';
import Input from "./Input";
import ChatBubble from './ChatBubble';

const CHAT_MESSAGES = gql`
  query {
    messages {
      id
      name
      content
    }
  }
`;

const MESSAGE_SUBSCRIPTION = gql`
subscription {
  message {
    id
    name 
    content
  }
}`;

const Chat = () => {

  const userName = useSelector(selectUsername);
  const { data, subscribeToMore  } = useQuery(CHAT_MESSAGES);

  useEffect(() => {
    subscribeToMore({
      document: MESSAGE_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const newMessage = subscriptionData.data.message;
        return Object.assign({}, prev, {
          messages: [newMessage, ...prev.messages]
        });
      }
    });
  } , [subscribeToMore])
   
    

  return (
    <div className="chat_room">
      <div className='chat_messages'>
        { !data ? null : data.messages.map((message) => <ChatBubble key={message.id} message={message} userName={userName} /> )}
      </div>
      <Input />
    </div>
  )
}

export default Chat;
