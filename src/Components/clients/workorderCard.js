import { useDispatch } from 'react-redux';
import { changeDoneStatus } from '../../Slice/workorder-slice'
import { Gallery } from '../Gallery';
import { Link, useHistory } from 'react-router-dom';


export const WorkOrderCard = ({ order }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id, title, description, street, postal_code: postalCode, city, image_link: imgLink, start_date: startDate, work_done: workDone, ts }
        = order;

    // const descLength = description.length;

    const date = new Date(startDate)
    const dateStamp = new Date(ts)
    date.setHours(date.getHours() + 2);
    dateStamp.setHours(dateStamp.getHours() + 2);
    const tsDay = dateStamp.getDate().toString().length === 1 ? `0${dateStamp.getDate()}` : dateStamp.getDate()
    const tsMonth = dateStamp.getMonth().toString().length === 1 ? `0${dateStamp.getMonth() + 1}` : dateStamp.getMonth() + 1
    const tsHours = dateStamp.getHours().toString().length === 1 ? `0${dateStamp.getHours()}` : dateStamp.getHours()
    const tsMinutes = dateStamp.getMinutes().toString().length === 1 ? `0${dateStamp.getMinutes()}` : dateStamp.getMinutes()
    const shownDate = `${tsHours}:${tsMinutes} - ${tsDay}/${tsMonth}`
    // const role = localStorage.getItem('role');
    const redRawa = {
        textDecoration: workDone ? "line-through" : "none",
        backgroundColor: workDone ? "lightgrey" : "transparent",
        color: workDone ? "lightgrey" : "transparent"
    }

    const onDone = () => {
        dispatch(changeDoneStatus(id))
    }

    return (
        <>
            <div className='worder-card' style={redRawa}>
                <Gallery imageLinkArray={imgLink} />
                <div className='worder-card__text' onClick={() => history.push(`/order/${id}`)}>
                    <div className='worder-card__text--date'>Registered: {shownDate}</div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <h4>Adress</h4>
                    <p>{street}</p>
                    <p>{postalCode}</p>
                    <p>{city}</p>
                </div>

                <Link to={`/order/${id}`} style={{ textDecoration: 'none' }}><button className="offer-button">Click here to see offers</button></Link>
                {/* <button className="orderDone-button" onClick={onDone}>Order Done</button> */}
            </div>

        </>
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