import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchWorkorders } from '../../Slice/workorder-slice';
import {WorkOrderCard as OrderCard} from './workorderCard';
import CreateOrder from './CreateOrder'


export const WorkorderList = () => {
    const id = '0a7f0b5d-1160-4bfd-8103-a5de4db55b6e';
    const dispatch = useDispatch();

    const orders = useSelector(state => (state.workorderSlice))
    useEffect(() =>{
        dispatch(fetchWorkorders(id))
    },[dispatch]);

    if(orders.status !== 'done') {
        return <><p>Loading...</p></>
    }

    return(
        <div className="order-list">
            <CreateOrder />
            <h2>Hella work Orders:</h2>
            {orders.entities.map(order => (
               <OrderCard order={order} key={order.id} />
            ))}
        </div>
    )
}