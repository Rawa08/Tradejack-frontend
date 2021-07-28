import { useState, useEffect, useRef } from "react"
import { useLocation } from 'react-router-dom'
import io from "socket.io-client";
import Chat from './Chat'
import './chatholder.css'

const useQuery = () => new URLSearchParams(useLocation().search);

const ChatHolder = () => {
  let query = useQuery();
  const [chats, setChats] = useState([]);
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const socketRef = useRef();
  const loadedRef = useRef(false);

  useEffect(() => {
    const username = localStorage.getItem('username')
    setUsername(username);
  }, [room, username]);

  useEffect(() => {
    socketRef.current = io.connect('http://localhost:3000');
    return () => {
      socketRef.current.disconnect();
    }
  }, [socketRef]);

  useEffect(() => {
    socketRef.current.on('sendChatList', info => {
      console.log(info);
      setChats(info);
    });
    return () => socketRef.current.removeAllListeners()
  },[])
//Please git when you are done we can git now

  useEffect(() => {
    if (loadedRef.current === false) {
      if (!query.get('user')) {
        loadedRef.current = true;
      }
      const receiver = query.get('rec');
      const title = query.get('ti');
      const room = `${username}${receiver}`
      const chatData = { username, receiver, room, title }
      loadedRef.current = true;
      socketRef.current.emit('join', chatData);
      console.log('firing');
      return socketRef.current.emit('fetchChats', username);
    }
  }, [query, loadedRef, room, username]);

  return (
    <div className='page'>
      <div className='sidebar'>
        <h3>Chats</h3>
        {chats && chats.map(chat => (
          <div key={chat.room} onClick={() => setRoom(chat.room)}>
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