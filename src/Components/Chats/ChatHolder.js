import { useState, useEffect, useRef } from "react"
import {v4 as uuid} from 'uuid';
import { useLocation } from 'react-router-dom'
import io from "socket.io-client";
import Chat from './Chat'
import './chatholder.css'

const useQuery = () => new URLSearchParams(useLocation().search);

const ChatHolder = ({username}) => {
  let query = useQuery();
  const [chats, setChats] = useState([]);
  const [room, setRoom] = useState('');
  const socketRef = useRef();
  const loadedRef = useRef(false);

  useEffect(() => {
    socketRef.current = io.connect('http://localhost:3000');
    socketRef.current.emit('fetchChats', username);
    return () => {socketRef.current.disconnect()
    socketRef.current.removeAllListeners()};
  }, [socketRef, username]);

  useEffect(() => {
    socketRef.current.on('sendChatList', info => {
      setChats(info);
    });
    return () => socketRef.current.removeAllListeners()
  },[socketRef])

  useEffect(() => {
    if (loadedRef.current === false) {
      if (!query.get('rec')) {
        return loadedRef.current = true;
      }
      const receiver = query.get('rec');
      const title = query.get('ti');
      const host = uuid();
      const chatData = { username, receiver, room:host, title }
      loadedRef.current = true;
      socketRef.current.emit('join', chatData);
      return socketRef.current.emit('fetchChats', username);
    }
  }, [query, room, username]);

  return (
    <div className='page'>
              <h3>Chats</h3>
      <div className='sidebar'>

        {chats && chats.map(chat => (
          <div key={chat.room} onClick={() => setRoom(chat.room)} className='message__tab'>
            <p style={{margin:0}}>Work Order:</p>
            <h4>{chat.title}</h4>
            <p style ={{margin:0}}>Contractor:</p>
            <p style={{fontsize:'0.5rem'}}>{chat.receiver}</p>
          </div>
        ))}
      </div>
      <Chat room={room} username={username} socketRef={socketRef} />
    </div>
  )
}

export default ChatHolder;