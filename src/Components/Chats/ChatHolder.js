import { useState, useEffect, useRef } from "react"
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
    return () => socketRef.current.disconnect();
  }, [socketRef, username]);

  useEffect(() => {
    socketRef.current.on('sendChatList', info => {
      console.log(info);
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
      console.log(receiver);
      const title = query.get('ti');
      const host = `${username}${receiver}`;
      console.log(host);
      const chatData = { username, receiver, room:host, title }
      loadedRef.current = true;
      socketRef.current.emit('join', chatData);
      console.log('firing');
      return socketRef.current.emit('fetchChats', username);
    }
  }, [query, room, username]);

  return (
    <div className='page'>
      <div className='sidebar'>
        <h3>Chats</h3>
        {chats && chats.map(chat => (
          <div key={chat.room} onClick={() => {setRoom(chat.room)}}>
            <h4>{chat.title}</h4>
            <p>{chat.receiver}</p>
          </div>
        ))}
      </div>
      <Chat room={room} username={username} socketRef={socketRef} />
    </div>
  )
}

export default ChatHolder;