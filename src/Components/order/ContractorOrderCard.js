import { useState } from 'react';
import { CreateOffers } from '../contractors/CreateOffers';
import { Gallery } from '../Gallery';
import Popup from '../Popup/Popup';
import './ContractorOrderCard.css';

export const ContractorOrderCard = ({ order }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { id, title, description, street, postal_code: postalCode, city, image_link: imgLink,
        start_date: startDate }
        = order;

    const date = new Date(startDate)
    date.setHours(date.getHours() + 2);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="order-card">

            {/* {imgLink.map((image, i) => <img style={image_style} key={`${image}+${i}`} src={image} alt="look here, it's a naked crocodile" />)} */}
            <Gallery imageLinkArray={imgLink} />
            <div className="order-card__text">
                <h3 className="order-title">{title}</h3>
                <p className="order-description">{description}</p>
                <h4 className="adress-title">Adress</h4>
                <p className="order-street">{street}</p>
                <p className="order-postal">{postalCode}</p>
                <p className="order-city">{city}</p>
            </div>
            <input
                type="button"
                value="Offer your services"
                onClick={togglePopup}
                className='newOrder'
            />
            <div className='offer-pop'>
                {isOpen && <Popup content={<CreateOffers id={id} togglePopup={togglePopup} />} togglePopup={togglePopup} />}
            </div>
        </div>
    )
}


// [
//     {
//       "id": 1,
//       "author_id": "9cee1381-b1eb-40f2-a0d4-e2abff9aaac5",
//       "title": "Smashed windows",
//       "description": "I smashed all of my windows in my house by accident",
//       "street": "Paris allén",
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