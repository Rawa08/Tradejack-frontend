import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ContractorOrderCard } from './ContractorOrderCard';
import { fetchAllWorkOrders, orderFilter } from '../../Slice/contractor-slice';
import '../../Margin.css';
import './ContractorOrderCard.css';


export const WorkOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(state => (state.contractorSlice))
  const searchInit = {
    searchField: 'title',
    searchText: ''
  }
  const [ search, setSearch ] = useState(searchInit)

  useEffect(() => {
    dispatch(fetchAllWorkOrders())
  }, [dispatch]);



  const setSearchValue = e => {
    setSearch({...search, searchText: e.target.value})
    dispatch(orderFilter(search))
  };
  const setSelectValue = e => {
    console.log(e.target.value)
    setSearch({...search, searchField: e.target.value})
  };
  // onClick action
  const submitSearch = () => {
    setSearch(searchInit)
  };


  if (orders.status !== 'done') {
    return (
      <div>
        <p>Loading....</p>
      </div>
    )
  }

  return (
    <div className='container'>
      <div className="search-container">
        <form className='search-form'>
          <label className="search-label">Find prefered order</label>
          <input className="search-input" type="search"
          value={search.searchText}
          onChange={setSearchValue}/>

          <select className="form-select" onChange={setSelectValue}>
            <option value="title">Title</option>
            <option value="desc">Description</option>
          </select>
          <input className="search-button" type="button" value="Search" onClick={e => submitSearch(e)}/>
        </form></div>
      {orders && orders.entities.map(order => <ContractorOrderCard key={order.id} order={order}/>)}
    </div>
  )

}