import React, { useState } from 'react';

import "react-datepicker/dist/react-datepicker.css";
// import { useDispatch } from 'react-redux';
// import { createOrder, createWorkorder } from '../../Slice/workorder-slice';\
import './create.css';



export const CreateOffers = ({ id: order_id, togglePopup, saveOffer }) => {
  const [formData, setFormData] = useState('');
  const [error, setError] = useState(false);


  const handleSubmit =  e => {
    e.preventDefault();
    if (formData.length < 10) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      return
    }
    const payload = { message_field: formData, order_id }

    saveOffer(payload);

    setFormData('');
    togglePopup();
    return
  }

  return (

    <form onSubmit={handleSubmit} className='offerForm'>
      {error && <h4>Minimum length of message is 100 Characters</h4>}
      <label htmlFor='message'>
        <textarea name='message' rows='10' columns='1' required className='offerForm__text'
          onChange={e => setFormData(e.target.value)} value={formData} />
      </label>
      <input type='submit' value="Offer Services" className='offerForm__btn' />
    </form>
  )
}

