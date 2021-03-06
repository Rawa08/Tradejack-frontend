import { useState } from 'react';
import { CreateOffers } from '../contractors/CreateOffers';
import { Gallery } from '../Gallery';
import Popup from '../Popup/Popup';
import './ContractorOrderCard.css';
import axios from 'axios';
import '../LoginSignUp/Login.css';
import { Link } from 'react-router-dom';



export const ContractorOrderCard = ({ order }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { id, title, description, street, postal_code: postalCode, city, image_link: imgLink,
        start_date: startDate }
        = order;

    const [createMessage, setMessage] = useState('');

    const date = new Date(startDate)
    date.setHours(date.getHours() + 2);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    const saveOffertoDB = async (payload) => {
        await axios.post('http://localhost:3000/api/work/workoffers', payload, {
            headers: {
                'authorization': localStorage.getItem('accessToken')
            }
        }).then(res => {
            if (res.data.length > 0) {
                setMessage(res.data);
                setTimeout(() => { setMessage('') }, 3500);
            } else {
                if (res.data.length < 1) {
                    setMessage('Offer have been send!');
                    setTimeout(() => { setMessage('') }, 3500);
                }
            }

        })
    }

    return (

        <div className="order-card">

            {/* {imgLink.map((image, i) => <img style={image_style} key={`${image}+${i}`} src={image} alt="look here, it's a naked crocodile" />)} */}
            <img src={imgLink[0]} className="card-image"/>
            <Link to={`/order/${id}`} style={{ textDecoration: 'none' }}>
            <div className="order-card__text">

                <h3 className="order-title">{title}</h3>
                <p className="order-description">{description}</p>
                <h4 className="adress-title">Address:</h4>
                <p className="order-street">{street}</p>
                <p className="order-postal">{postalCode}</p>
                <p className="order-city">{city}</p>
            </div>
            </Link>
            <div className='offer-pop'>
                {isOpen && <Popup content={<CreateOffers id={id} togglePopup={togglePopup} saveOffer={saveOffertoDB} />} togglePopup={togglePopup} />}
            { createMessage.length > 0 && <p className="rating-message">{createMessage}</p> }
            </div>
            <input
                type="button"
                value="Offer your services"
                onClick={togglePopup}
                className='orders-offer-button'
            />
        </div>


    )
}


// [
//     {
//       "id": 1,
//       "author_id": "9cee1381-b1eb-40f2-a0d4-e2abff9aaac5",
//       "title": "Smashed windows",
//       "description": "I smashed all of my windows in my house by accident",
//       "street": "Paris all??n",
//       "postal_code": 77126,
//       "city": "San Leandro",
//       "start_date": "2021-07-30 07:59:50.697932+00",
//       "end_date": "",
//       "image_link": [
//         "https://i.pinimg.com/originals/02/b8/7f/02b87f100a0a114c6cfd1601d78dfca0.jpg"
//       ],
//       "approved": false,
//       "work_done": false,
//       "ts": "2021-07-21T09:55:18.583Z"
//     }
//   ]