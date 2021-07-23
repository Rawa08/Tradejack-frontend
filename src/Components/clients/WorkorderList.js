import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchWorkorders } from '../../Slice/workorder-slice';
import { WorkOrderCard as OrderCard } from './workorderCard';
import Popup from '../Popup/Popup'
import CreateOrder from './CreateOrder';



export const WorkorderList = () => {
    const dispatch = useDispatch();
    const orders = useSelector(state => (state.workorderSlice))
    const [isOpen, setIsOpen] = useState(false);
    const [newOrderBoolean, setNewOrderBoolean] = useState(false);

    useEffect(() => {
        dispatch(fetchWorkorders())
    }, [dispatch, newOrderBoolean]);

    if (orders.status !== 'done') {
        return <><p>Loading...</p></>
    }
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="order-list">
            <input
                type="button"
                value="Create new Work Order"
                onClick={togglePopup}
            />
            {isOpen && <Popup content={<CreateOrder newOrderBoolean={newOrderBoolean} setNewOrderBoolean={setNewOrderBoolean}
             setIsOpen={setIsOpen}/>} togglePopup={togglePopup}/> }

            <h2>Hella work Orders:</h2>
            {orders.entities.map(order => (
                <OrderCard order={order} key={order.id} />
            ))}
        </div>
    )
}