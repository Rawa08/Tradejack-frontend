import { useEffect,useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeDoneStatus, fetchWorkOffers } from '../../Slice/workorder-slice'
import { WorkOfferCard } from './WorkOfferCard';
import {Gallery} from '../Gallery';


export const OrderCard = ({ order }) => {
    const dispatch = useDispatch();
    const { id, title, description, street, postal_code: postalCode, city, image_link: imgLink, start_date: startDate, work_done: workDone, ts, author_id }
        = order;

    // const descLength = description.length;

    const date = new Date(startDate)
    const dateStamp = new Date(ts)
    date.setHours(date.getHours() + 2);
    dateStamp.setHours(dateStamp.getHours() + 2);
    const tsDay = dateStamp.getDate().toString().length === 1 ? `0${dateStamp.getDate()}` : dateStamp.getDate()
    const tsMonth = dateStamp.getMonth().toString().length === 1 ? `0${dateStamp.getMonth()}` : dateStamp.getMonth()
    const tsHours = dateStamp.getHours().toString().length === 1 ? `0${dateStamp.getHours()}` : dateStamp.getHours()
    const tsMinutes = dateStamp.getMinutes().toString().length === 1 ? `0${dateStamp.getMinutes()}` : dateStamp.getMinutes()
    const shownDate = `${tsHours}:${tsMinutes} - ${tsDay}/${tsMonth}`
    // const role = localStorage.getItem('role');
    const redRawa = {
        textDecoration: workDone ? "line-through" : "none",
        backgroundColor: workDone ? "red" : "transparent"
    }
    const [here, setHere] = useState(false)

    useEffect(() => {
        setHere(!here)
    },[])

    useEffect(() => {
        dispatch(fetchWorkOffers(id))
    }, [dispatch, id, here])

    const onDone = () => {
        dispatch(changeDoneStatus(id))
    }

    return (
        <div className='worder-card' style={redRawa}>
           <Gallery imageLinkArray={imgLink} />
            {/* {imgLink.map(image => <img style={image_style} key={image} src={image} alt="look here, it's a naked crocodile" />)} */}
            <div className='worder-card__text'>
                <div className='worder-card__text--date'>Registered: {shownDate}</div>
                <h3>{title}</h3>
                <p>{description}</p>
                <h4>Adress</h4>
                <p>{street}</p>
                <p>{postalCode}</p>
                <p>{city}</p>
                <button onClick={onDone}>Order Done</button>
                <div className='Offer-holder'>
                    {order.workOffers && order.workOffers.map(offer => (
                        <WorkOfferCard key={offer.id} offer={offer} client={author_id} />
                    ))}
                </div>
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