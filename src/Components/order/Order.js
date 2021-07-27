import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { fetchOneWorkOrder, changeDoneStatus } from '../../Slice/bigorder-slice';
import {ContractorOrderCard} from '../contractors/ContractorOrderCard';
import {WorkOrderCard} from '../clients/workorderCard';
import { WorkOfferCard } from './WorkOfferCard';
import {Gallery} from '../Gallery';
import './Order.css'

const Order = () => {
  const {id: order_id} = useParams();
  const dispatch = useDispatch()
  const order = useSelector(state => state.bigorderSlice)
  const { id, title, description, street,
          postal_code: postalCode, city,
          image_link: imgLink, start_date: startDate,
          work_done: workDone, ts, author_id,
          workoffers }
        = order.entities;

    // const descLength = description.length;
    const role = localStorage.getItem('role');
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
        backgroundColor: workDone ? "red" : "transparent",
    }

    useEffect(() => {
      dispatch(fetchOneWorkOrder(order_id))
    }, [dispatch])

    const onDone = () => {
        dispatch(changeDoneStatus(id))
    }

  if(order.status !== 'done'){
    return (
      <div className='order-card-big'>
        Loading....
      </div>
    )
  }

    return (
      <>
        <div className='order-card-big' style={redRawa}>
           <Gallery imageLinkArray={imgLink} />
            {/* {imgLink.map(image => <img style={image_style} key={image} src={image} alt="look here, it's a naked crocodile" />)} */}
                <div className='worder-card__text--date'>Registered: {shownDate}</div>
            <div className='order-card-big__text'>
                <h3>{title}</h3>
                <p>{description}</p>
                <h4>Adress</h4>
                <p>{street}</p>
                <p>{postalCode}</p>
                <p>{city}</p>
                <button onClick={onDone}>Order Done</button>
            </div>
        </div>
        {role === 'client' && <div>
              {workoffers && workoffers.map(offer => (
                  <WorkOfferCard key={offer.id} offer={offer} client={author_id} />
              ))}
        </div>}

      </>
    )
}

export default Order
