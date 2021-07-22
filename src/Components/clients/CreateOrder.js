import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './CreateOrder.css';
import { useDispatch } from 'react-redux';
import { createOrder, createWorkorder } from '../../Slice/workorder-slice';


const CreateOrder = ({setNewOrderBoolean, newOrderBoolean}) => {
  const dispatch = useDispatch();
  const date = new Date();
  date.setDate(date.getDate() + 2);

  const initialState = {
    title: '',
    description: '',
    street: '',
    postal_code: '',
    city: '',
    start_date: date,
    image_link: []
  }

  const [order, setOrder] = useState(initialState);
  const [previewSource, setPreviewSource] = useState([])

  const handleChange = (e) => {
    setOrder(prevstate => ({ ...prevstate, [e.target.name]: e.target.value }))
  }


  const setStartDate = (date) => {
    setOrder({ ...order, start_date: date })
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
    e.preventDefault();
    dispatch(createOrder({ ...order, image_link: previewSource }));
    dispatch(createWorkorder({ ...order, image_link: previewSource }));
    setOrder(initialState);
    setNewOrderBoolean(!newOrderBoolean);
  }

  return (
    <div>
      <form onSubmit={onSubmit}
        className="workOrder">
        <label >Title:</label>
        <input name="title"
          onChange={handleChange}
          value={order.title}
          required
        ></input>
        <label >Description:</label>
        <input name="description"
          onChange={handleChange}
          value={order.description}
          required
        ></input>
        <label >Street:</label>
        <input name="street"
          onChange={handleChange}
          value={order.street}
          required
        ></input>
        <label >Postal:</label>
        <input name="postal_code"
          onChange={handleChange}
          value={order.postal_code}
          required
        ></input>
        <label >City:</label>
        <input name="city"
          onChange={handleChange}
          value={order.city}
          required
        ></input>
        <label >Date:</label>
        <DatePicker dateFormat="yyyy/MM/dd" selected={order.start_date}
          onChange={(date) => setStartDate(date)}
          minDate={new Date(date)}
          openToDate={new Date(date)}/>
        <label >Images:</label>
        <input name="image_link"
          onChange={handleImage}
          type='file'
          multiple={true}
          accept=".png, .jpg, .jpeg"
          required
        ></input>
        <input
          type='submit'
        ></input>
      </form>
    </div>
  )
}

export default CreateOrder
