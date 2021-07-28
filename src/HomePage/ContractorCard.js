import React from 'react';
import StarPicker from 'react-star-picker';

const ContractorCard = ({contractor}) => {
  const {
    city,
    company_name,
    email,
    last_login,
    profile_image,
    rating
  } = contractor;
  const mailto = `mailto: ${email}`
  const dateStamp = new Date(last_login)
  console.log(dateStamp.getMonth())
  dateStamp.setHours(dateStamp.getHours() + 2);
  const tsDay = dateStamp.getDate().toString().length === 1 ? `0${dateStamp.getDate()}` : dateStamp.getDate()
  const tsMonth = dateStamp.getMonth().toString().length === 1 ? `0${dateStamp.getMonth()+1}` : dateStamp.getMonth()+1
  const tsHours = dateStamp.getHours().toString().length === 1 ? `0${dateStamp.getHours()}` : dateStamp.getHours()
  const tsMinutes = dateStamp.getMinutes().toString().length === 1 ? `0${dateStamp.getMinutes()}` : dateStamp.getMinutes()
  const shownDate = `${tsHours}:${tsMinutes} - ${tsDay}/${tsMonth}`


  return (
    <div className='contractor-home-card'>
      <img src={profile_image} alt='our handsome contractors'/>
        <div className='contractor-home-card--text'>
          <h3>Company name:</h3>
          <p>{company_name}</p>
          <h3>City:</h3>
          <p>{city}</p>
          <h3>Email:</h3>
          <p><a href={mailto}>{email}</a></p>
          <StarPicker disabled value={rating} size={20} />
          <p>Last Login:  {shownDate}</p>
        </div>
    </div>
  )
}

export default ContractorCard

// city: "Danville"
// client_id: "73706bb1-2fb9-4c3f-80c2-ce419bffc78a"
// company_name: "Svensson Gruppen"
// contractor_id: "e234a891-d7d2-478c-a816-3bce0c6b23db"
// email: "Valentin_Eriksson@example.org"
// f_name: null
// id: 73
// l_name: null
// last_login: "2021-07-27T09:30:59.444Z"
// org_number: "9823008686"
// password: "$2b$10$NQ9PTutXYzlJVqo5XzItPeGMuU84l5wyBwccRbPQ16fJ8eHkd6NXS"
// phone_num: "1175-757841"
// postal_code: 99329
// profile_image: "https://agiltec.se/wp-content/uploads/blank-profile-picture-973460_640.png"
// rating: 5
// review: null​
// street: "Svensson vägen"
// ts: "2021-07-28T07:31:06.326Z"
// username: "Lolita.Johansson"
// workorder_id: 57
