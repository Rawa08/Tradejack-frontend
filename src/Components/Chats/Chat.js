import { useState, useEffect, useRef } from 'react';
import './Chat.css';

const Chat = ({ username, room, socketRef }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }


  console.log(room);
  useEffect(() => {
    const socketNow = socketRef.current;
    if (room !== '') {
      socketNow.emit('fetchOld', room);
      socketNow.emit('joinExisting', room);
    }
  }, [room, socketRef])



  useEffect(() => {
    if (room !== '') {
      socketRef.current.on("message", msg => {
        setMessages(prevState => [...prevState, msg])
      })
      return () => socketRef.current.removeAllListeners();
    }
  }, [room, socketRef]);

  useEffect(() => {
    if (room !== '') {
      socketRef.current.on('bulkMessages', msgs => {
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

  useEffect(scrollToBottom, [messages]);

  return (
    <div>
      <div className='messages'>
        {error && <h3>{error}</h3>}
        {messages && messages.map((message, i) => {
          if (message.sender === username) {
            return (
              <div key={i} className='my-message' >
                <div className='message_info'>
                  <p className='message__author'>{message.sender}:</p>
                  <p className='message__ts'>{message.tStamp}</p>
                </div>
                <p className='message__content'>{message.message}</p>

              </div>
            )
          }
          return (
            <div key={i} className='other-message' >
               <div className='message_info'>
                  <p className='message__author'>{message.sender}:</p>
                  <p className='message__ts'>{message.tStamp}</p>
                </div>
                <p className='message__content'>{message.message}</p>
            </div>
          )

        })}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={messageSubmit}>
        <textarea className='chat__input' type="text" name="" value={message} onChange={e => setMessage(e.target.value)} />
        <input type="submit" value="Send" />
      </form>
    </div>
  )
}

export default Chat

// LocalStorage Solution :
// useEffect(() => {

  //   if (room !== '') {
  //     const store = JSON.parse(localStorage.getItem('chats'));
  //     if (store) {
  //       const index = store.findIndex(ms => ms.room === room)
  //       if (index !== -1){
  //         setMessages([...store[index].messages]);
  //         console.log(messages)
  //         console.log('ji')
  //         return;
  //       }
  //       return setMessages([]);
  //     }
  //     return;
  //   }
  // },[room])

  // useEffect(() => {
  //   if (messages.length > 0){
  //     const store = JSON.parse(localStorage.getItem('chats'));
  //     if (store) {
  //       const index = store.findIndex(ms => ms.room === room);
  //       store[index].messages = [...messages];
  //       return localStorage.setItem('chats', JSON.stringify(store));
  //     }
  //     return;
  //   }
  // },[messages]);
