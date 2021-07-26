import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ContractorOrderCard } from './ContractorOrderCard';
import {fetchAllWorkOrders} from '../../Slice/contractor-slice';
import '../../Margin.css';


export const WorkOrders = () => {
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
      {orders && orders.entities.map(order => <ContractorOrderCard key={order.id} order={order} />)}
    </div>
  )

}