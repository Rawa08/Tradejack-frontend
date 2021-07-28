import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../LoginSignUp/Login.css';
import axios from 'axios';
import StarPicker from 'react-star-picker';

export const WorkOfferCard = ({ offer, client, title }) => {


  const { id, company_name, phone_num, message_field, ts, chosen, email, contractor_id, profile_image } = offer;

  const role = localStorage.getItem('role');
  const [chosenState, setChosenState] = useState(chosen);
  const [rating, setRating] = useState(null);
  const [rerenderRating, setRerenderRating] = useState(true);
  const [ratingMessage, setMessage] = useState('')
  const [path, setPath] = useState('');

  const mailto = `mailto: ${email}`
  const dateStamp = new Date(ts)
  dateStamp.setHours(dateStamp.getHours() + 2);
  const tsDay = dateStamp.getDate().toString().length === 1 ? `0${dateStamp.getDate()}` : dateStamp.getDate()
  const tsMonth = dateStamp.getMonth().toString().length === 1 ? `0${dateStamp.getMonth()}` : dateStamp.getMonth()
  const tsHours = dateStamp.getHours().toString().length === 1 ? `0${dateStamp.getHours()}` : dateStamp.getHours()
  const tsMinutes = dateStamp.getMinutes().toString().length === 1 ? `0${dateStamp.getMinutes()}` : dateStamp.getMinutes()
  const shownDate = `${tsHours}:${tsMinutes} - ${tsDay}/${tsMonth}`

  useEffect(() => {
    setChosenState(chosen);
  }, [chosen]);

  useEffect(() => {

    axios.get(`http://localhost:3000/api/work/rating/average/${contractor_id}`)
      .then(d => setRating(d.data.rating));
  }, [rating, rerenderRating, contractor_id])



  const setRatingValue = (value) => {
    console.log(contractor_id)
    setRating(value);
    const body = {
      contractor_id: contractor_id,
      workorder_id: offer.order_id,
      client_id: client,
      rating: value,
      // "review": "It Works"
    }

    axios.post(`http://localhost:3000/api/work/rating/`, body).then(d => {
      setRerenderRating(!rerenderRating);
      setMessage(d.data);
      setTimeout(() => { setMessage('') }, 3000);

    })
  }

  const toggleChosen = () => {

    setChosenState(!chosen);

    axios.put(`http://localhost:3000/api/work/workoffers/${id}`, {
      updatetype: 'chosen',
      data: !chosen
    })

  }
  useEffect(() => {
    const encodedTitle = encodeURI(title);
    const encodeRec = encodeURI(company_name);
    setPath(`/chats/?rec=${encodeRec}&ti=${encodedTitle}`);
  },[title, company_name]);

  return (
    <> {ratingMessage.length > 0 && <p className="rating-message">{ratingMessage}</p>}
      <div className='order-card-big__offer-holder'>
        <div>
          <img src={profile_image} alt='profile' />
        </div>
        <div>
        {chosen ? <small>True</small> : <small>False</small>}
          <div className='order-card-big__offer-holder--details'>
            <div className='top-holder'>
              <div>

                <h4>Company name:</h4>
                <p>{company_name}</p>
              </div>
              <div>
                {path && <p><Link to={path}>Chat with {company_name}</Link></p>}
              </div>
            </div>
            <h4>Phone number:</h4>
            <p>{phone_num}</p>
            <h4>Email:</h4>
            <p><a href={mailto}>{email}</a></p>
          </div>
          <div className='order-card-big__offer-holder--offer'>
            <h5>{message_field}</h5>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              {role === 'client' ? <label className="switch">
                <input type="checkbox" onChange={toggleChosen} className='' checked={chosenState} />
                <span className="slider round"></span>
              </label> : { chosenState } && <p>Your offer has been accepted</p>}
              <StarPicker onChange={setRatingValue} value={rating} size={20} />
            </div>
          </div>
          <p className='order-card-big__offer-holder--time'><small>Offered: {shownDate}</small></p>
        </div>
      </div>
    </>
  )
}