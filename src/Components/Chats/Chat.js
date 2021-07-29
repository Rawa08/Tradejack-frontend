import { useEffect, useRef } from 'react';
import './Chat.css';

const Chat = ({ username, messageSubmit, error, messages, setMessage, message }) => {

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
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
      <form onSubmit={messageSubmit} className='chat__form'>
        <textarea className='chat__input' type="text" name="" value={message} onChange={e => setMessage(e.target.value)} />
        <input type="submit" value="Send" className='chat__button'/>
      </form>
    </div>
  )
}

export default Chat
