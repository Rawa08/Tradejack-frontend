import { Gallery } from '../Gallery';
import './ContractorOrderCard.css';

export const ContractorOrderCardOffer = ({ order }) => {
    const { title, description, street, postal_code: postalCode, city, image_link: imgLink,
        start_date: startDate, message_field, forename, lastname, clientmail, clientphone }
        = order;
    const mailto = `mailto: ${clientmail}`
    const date = new Date(startDate)
    date.setHours(date.getHours() + 2);

    return (

        <div className="order-card order-card--offer">

            {/* {imgLink.map((image, i) => <img style={image_style} key={`${image}+${i}`} src={image} alt="look here, it's a naked crocodile" />)} */}
            <Gallery imageLinkArray={imgLink} />
            <h3 className="order-title">{title}</h3>
            <p className="order-description">{description}</p>
            <h4>Client:</h4>
            <div className='client-data'>
                <div>
                <h5 className='client-name'>Name</h5>
                <p>{`${forename} ${lastname}`}</p>
                </div>
                <div>
                <h5 className='client-phone'>Phone:</h5>
                <p>{clientphone}</p>
                </div>
                <div>
                <h5 className='client-email'>Email:</h5>
                <p><a href={mailto}>{clientmail}</a></p>
                </div>
                <div>
                <h5 className="adress-title">Address</h5>
                <p className="order-street">{street}</p>
                <p className="order-postal">{postalCode}</p>
                <p className="order-city">{city}</p>
                </div>
            </div>
            <div className='myoffer_field'>
                <h5>My offer:</h5>
                <p>{message_field}</p>
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