import { useState, useEffect } from 'react';

const Chat = ({ username, room, socketRef }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const socketNow = socketRef.current;
    if (room !== '') {
      setMessages([]);
      socketNow.emit('fetchOld', room);
      socketNow.emit('join', room);
    }
  }, [room, socketRef])

  useEffect(() => {
    if (room !== '') {
      socketRef.current.on("message", msg => {
        console.log('hi');
        setMessages(prevState => [...prevState, msg])
      })
      return () => socketRef.current.removeAllListeners();
    }
  }, [room, socketRef]);

  useEffect(() => {
    if (room !== '') {
      socketRef.current.on('bulkMessages', msgs => {
        console.log(msgs);
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
    <div>
      <h3>Chat</h3>
      <div className='messages'>
        {error && <h3>{error}</h3>}
        {messages && messages.map((message, i) => (
          <div key={i}>
            <p>{message.sender}:</p>
            <p>{message.message}</p>
            <p>{message.tStamp}</p>
          </div>
        ))}
      </div>
      <form onSubmit={messageSubmit}>
        <input type="text" name="" value={message} onChange={e => setMessage(e.target.value)} />
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
