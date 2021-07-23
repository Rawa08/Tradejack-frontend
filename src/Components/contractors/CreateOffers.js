import React, { useState } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
// import { useDispatch } from 'react-redux';
// import { createOrder, createWorkorder } from '../../Slice/workorder-slice';



export const CreateOffers = ({ id: order_id }) => {
  const [formData, setFormData] = useState('')
  const [error, setError] = useState(false)
  // const dispatch = useDispatch();

  // const initialState = {
  //   order_id,
  //   message_field: '',
  // }

  const contractor_id = 'e234a891-d7d2-478c-a816-3bce0c6b23db'

  const handleSubmit = async e => {
    e.preventDefault();
    if (formData.length < 10) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      return
    }
    console.log(formData)
    const payload ={message_field:formData, order_id, contractor_id}
    console.log(payload);
    await axios.post('http://localhost:3000/api/work/workoffers', payload)
    setFormData('');
    return
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <h4>Minimum length of message is 100 Characters</h4>}
      <label htmlFor='message'>
        <textarea name='message' rows='6' columns='10' required
        onChange={e => setFormData(e.target.value)} value={formData}/>
      </label>
      <input type='submit' value="Submit" />
    </form>
  )
}

