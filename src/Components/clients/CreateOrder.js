import React, {useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './CreateOrder.css';

const CreateOrder = () => {
  const [ order, setOrder] = useState({
    title: '',
    description: '',
    street: '',
    postal_code: '',
    city: '',
    start_date: '',
    image_link: []
  })

  const [previewSource, setPreviewSource] = useState([])

  const handleChange = (e) => {
    setOrder(prevstate => ({...prevstate, [e.target.name]: e.target.value}))
  }


  const setStartDate = (date) => {
    setOrder({...order, start_date: date})
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const imgUrl = await fetch('http://localhost:3000/api/work/workorders/uploadimage', {
        method: 'POST',
        body: JSON.stringify({ data: reader.result }),
        headers: { 'Content-Type': 'application/json' },
    });
    const data = await imgUrl.json();
      setPreviewSource(prevState => [...prevState, data])
    }
  }

  const handleImage = (e) => {
    [...e.target.files].forEach(pic => {
      previewFile(pic)
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(previewSource)
  }

  return (
    <div>
      <form onSubmit={onSubmit}
      className="workOrder">
        <label >Title:</label>
        <input name="title"
        onChange={handleChange}
        value={order.title}
        ></input>
        <label >Description:</label>
        <input name="description"
        onChange={handleChange}
        value={order.description}
        ></input>
        <label >Street:</label>
        <input name="street"
        onChange={handleChange}
        value={order.street}
        ></input>
        <label >Postal:</label>
        <input name="postal_code"
        onChange={handleChange}
        value={order.postal_code}
        ></input>
        <label >City:</label>
        <input name="city"
        onChange={handleChange}
        value={order.city}
        ></input>
        <label >Date:</label>
        <DatePicker dateFormat="yyyy/MM/dd" selected={order.start_date}
        onChange={(date) => setStartDate(date)} />
        <label >Images:</label>
        <input name="image_link"
        onChange={handleImage}
        type='file'
        multiple={true}
        accept=".png, .jpg, .jpeg"
        ></input>
        <input
        type='submit'
        ></input>
      </form>
    </div>
  )
}

export default CreateOrder
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
