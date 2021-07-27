
// import { useEffect ,useState, useRef } from 'react';
// import '../LoginSignUp/Login.css'
// import axios from 'axios';
// import Rating from '@material-ui/lab/Rating';

// export const WorkOfferCard = ({ offer, client }) => {

//   const { id, company_name, phone_num, message_field, ts, chosen, email, contractor_id } = offer;
//   const role = localStorage.getItem('role');
//   const [chosenState, setChosenSate] = useState(true);
//   const [rating, setRating] = useState(null);
//   const didMount = useRef(false);
//   const mailto = `mailto: ${email}`

//   axios.get(`http://localhost:3000/api/work/rating/average/${contractor_id}`)
//   .then(d => setRating(d.data.rating));

//   const body ={
//     contractor_id: contractor_id,
//     workorder_id: offer.order_id,
//     client_id: client,
//     rating: rating,
//     // "review": "It Works"
//   }
//   const setRatingValue =  (e, newValue) => {
//     setRating(newValue);
//   }

//   useEffect(() => {

//     // axios.post(`http://localhost:3000/api/work/rating/`,body).then(d => console.log('from useEffect: '+d.data))

//   },rating);




//   const toggleChosen = () => {
//     setChosenSate(!chosenState);

//     axios.put(`http://localhost:3000/api/work/workoffers/${id}`, {
//       updatetype: 'chosen',
//       data: chosenState
//     })

//   }



//   return (
//     <div>
//       <h4>Company name:</h4>
//       <h5>{company_name}</h5>
//       <Rating name="simple-controlled" value={rating} onChange={(event, newValue) => {
//         setRatingValue(event, newValue);
//       }}
//       />

//       <h4>Phone number:</h4>
//       <h5>{phone_num}</h5>
//       <h4>Email:</h4>
//       <h5><a href={mailto}>{email}</a></h5>
//       <p>{message_field}</p>
//       <p>{chosen}</p>
//       <div className=''>
//         {role === 'client' ? <label className="switch">

//           <input type="checkbox" onChange={toggleChosen} className='' />
//           <span className="slider round"></span>
//         </label> : { chosenState } && <p>Your offer has been accepted</p>}
//         <p><small>{ts}</small></p>
//       </div>
//     </div>
//   )
// }