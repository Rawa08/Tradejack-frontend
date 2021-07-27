
import { useEffect, useState } from 'react';
import '../LoginSignUp/Login.css'
import axios from 'axios';
import StarPicker from 'react-star-picker';

export const WorkOfferCard = ({ offer, client }) => {

  const { id, company_name, phone_num, message_field, ts, chosen, email, contractor_id, profile_image } = offer;

  const role = localStorage.getItem('role');
  const [chosenState, setChosenSate] = useState(false);
  const [rating, setRating] = useState(null);
  const [rerenderRating, setRerenderRating] = useState(true);
  const [ratingMessage, setMessage] = useState('')

  const mailto = `mailto: ${email}`
  const dateStamp = new Date(ts)
  dateStamp.setHours(dateStamp.getHours() + 2);
  const tsDay = dateStamp.getDate().toString().length === 1 ? `0${dateStamp.getDate()}` : dateStamp.getDate()
  const tsMonth = dateStamp.getMonth().toString().length === 1 ? `0${dateStamp.getMonth()}` : dateStamp.getMonth()
  const tsHours = dateStamp.getHours().toString().length === 1 ? `0${dateStamp.getHours()}` : dateStamp.getHours()
  const tsMinutes = dateStamp.getMinutes().toString().length === 1 ? `0${dateStamp.getMinutes()}` : dateStamp.getMinutes()
  const shownDate = `${tsHours}:${tsMinutes} - ${tsDay}/${tsMonth}`



  useEffect(()=>{
    axios.get(`http://localhost:3000/api/work/rating/average/${contractor_id}`)
    .then(d => setRating(d.data.rating));
  },[rating,rerenderRating])



  const setRatingValue = (value) => {
    setRating(value);
    const body = {
      contractor_id: contractor_id,
      workorder_id: offer.order_id,
      client_id: client,
      rating: value,
      // "review": "It Works"
    }

    axios.post(`http://localhost:3000/api/work/rating/`, body).then(d =>
    {
      setRerenderRating(!rerenderRating);
      setMessage(d.data);
      setTimeout(()=>{ setMessage('') }, 3000);

    })
  }
  // useEffect(() =>{

  //   axios.get(`http://localhost:3000/api/work/workoffers/byId/${id}`)

  //   .then(d => setChosenSate(d.data[0].chosen))

  // },[chosenState]);

  const toggleChosen = () => {
    setChosenSate(!chosenState);

    axios.put(`http://localhost:3000/api/work/workoffers/${id}`, {
      updatetype: 'chosen',
      data: chosenState
    })

  }

  return (
   <> {ratingMessage.length>0 && <p className="rating-message">{ratingMessage}</p>}
    <div className='order-card-big__offer-holder'>

        <div>
        <img src={profile_image} />
      </div>
      <div>
        <div className='order-card-big__offer-holder--details'>
        <h4>Company name:</h4>

        <p>{company_name}</p>
        <h4>Phone number:</h4>
        <p>{phone_num}</p>
        <h4>Email:</h4>
        <p><a href={mailto}>{email}</a></p>
        </div>
        <div className='order-card-big__offer-holder--offer'>
        <h5>{message_field}</h5>
        <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
          {role === 'client' ? <label className="switch">
            <input type="checkbox" onChange={toggleChosen} className='' checked={chosenState} />
            <span className="slider round"></span>
          </label> : { chosenState } && <p>Your offer has been accepted</p>}
        <StarPicker onChange={setRatingValue} value={rating} size={20}/>
        </div>
        </div>
          <p className='order-card-big__offer-holder--time'><small>Offered: {shownDate}</small></p>

      </div>

    </div></>
  )
}