import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ContractorOrderCardOffer } from './ContractorOrderCardOffer';
import {fetchAllAssignedWorkOrders} from '../../Slice/contractor-slice';
import '../../Margin.css';


export const WorkOrdersAssigned = () => {
  const dispatch = useDispatch();
  const orders = useSelector(state => (state.contractorSlice))
  console.log(orders.entities)

  useEffect(() => {
    dispatch(fetchAllAssignedWorkOrders())
  }, [dispatch]);

  if (orders.status !== 'done') {
    return (
      <div>
         <p>Loading....</p>
      </div>
    )
  }

  return (
    <div className='container'>
      {orders && orders.entities.map(order => <ContractorOrderCardOffer key={order.offer_id} order={order} />)}
    </div>
  )

}