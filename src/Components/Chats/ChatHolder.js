import { useState, useEffect, useRef } from "react"
import { v4 as uuid } from 'uuid';
import { useLocation } from 'react-router-dom'
import io from "socket.io-client";
import Chat from './Chat'
import './chatholder.css'

const useQuery = () => new URLSearchParams(useLocation().search);

const ChatHolder = ({ username }) => {
  let query = useQuery();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const [chats, setChats] = useState([]);
  const [room, setRoom] = useState('');
  const socketRef = useRef();
  const loadedRef = useRef(false);

  useEffect(() => {
    socketRef.current = io.connect('http://localhost:3000');
    socketRef.current.emit('fetchChats', username);
    return () => {
      socketRef.current.disconnect();
    }
  }, [socketRef, username]);

  useEffect(() => {
    socketRef.current.on('sendChatList', info => {
      setChats(info);
    });
    return () => socketRef.current.removeAllListeners()
  }, [socketRef])

  useEffect(() => {
    if (loadedRef.current === false) {
      if (!query.get('rec')) {
        return loadedRef.current = true;
      }
      const receiver = query.get('rec');
      const title = query.get('ti');
      const host = uuid();
      const chatData = { username, receiver, room: host, title }
      loadedRef.current = true;
      socketRef.current.emit('join', chatData);
      return socketRef.current.emit('fetchChats', username);
    }
  }, [query, room, username]);

  useEffect(() => {
    const socketNow = socketRef.current;
    if (room !== '') {
      console.log('sending for old');
      socketNow.emit('fetchOld', room);
    }
  }, [room, socketRef])

  useEffect(() => {
    if (room !== '') {
      socketRef.current.on("message", msg => {
        setMessages(prevState => [...prevState, msg])
      })
    }
  }, [room, socketRef]);

  useEffect(() => {
    if (room !== '') {
      socketRef.current.on('bulkMessages', msgs => {
        console.log('receiving old messages');
        setMessages([...msgs]);
      })
    }
    return () => {
      socketRef.current.removeAllListeners()
    }
  }, [room, socketRef]);

  const messageSubmit = e => {
    e.preventDefault();
    if (room !== '') {
      const body = { username, room, message }
      socketRef.current.emit('newMessage', body)
      return setMessage('');
    }
    setError('Please select a chat')
    return setTimeout(() => {
      setError('');
    }, 2000)
  }

  return (
    <div className='page'>
      <div className='sidebar'>
        <div style={{ marginRight: '0.5rem',marginLeft:'5px' }}>
          <p style={{ margin: 0 }}>Your</p>
          <p style={{ margin: 0 }}>chats:</p>
        </div>
        {chats.length > 0 ? chats.map(chat => (
          <div key={chat.room} onClick={() => {setRoom(chat.room)
          socketRef.current.emit('joinExisting', chat.room)}} className='message__tab'>
            <p style={{ margin: 0 }}>Work Order:</p>
            <h4>{chat.title}</h4>
            <p style={{ margin: 0 }}>Contractor:</p>
            <p style={{ fontsize: '0.5rem' }}>{chat.receiver}</p>
          </div>
        )) : <div className='message__tab'>
          <p style={{ margin: 0 }}>Chats:</p>
          <h4>You currently have no chats</h4>
          <p style={{ margin: 0 }}>You can start chats from</p>
          <p style={{ fontsize: '0.5rem' }}>your work offers</p>
        </div>}
      </div>
      <Chat room={room} username={username} messageSubmit={messageSubmit}
       error={error} messages={messages} setMessage={setMessage} message={message}/>
    </div>
  )
}

export default ChatHolder;