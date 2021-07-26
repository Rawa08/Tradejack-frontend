
import { useState } from 'react';
import '../LoginSignUp/Login.css'
import axios from 'axios';

export const WorkOfferCard = ({ offer }) => {

  const { id, company_name, phone_num, message_field, ts, chosen } = offer;
  const role = localStorage.getItem('role');

  const [chosenState, setChosenSate] = useState(true);

  const toggleChosen = () => {
    setChosenSate(!chosenState);

    axios.put(`http://localhost:3000/api/work/workoffers/${id}`, {
      updatetype: 'chosen',
      data: chosenState
    })

  }



  return (
    <div>
      <h2>{company_name}</h2>
      <h5>{phone_num}</h5>
      <p>{message_field}</p>
      <p>{chosen}</p>
      <div className=''>
      {role === 'client' ? <label className="switch">

        <input type="checkbox" onChange={toggleChosen} className=''/>
        <span className="slider round"></span>
      </label> : { chosenState } && <p>Your offer has been accepted</p>}
      <p><small>{ts}</small></p>
      </div>
    </div>
  )
}