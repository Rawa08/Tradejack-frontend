import { WorkorderList } from "../Components/clients/WorkorderList";
import {WorkOrders} from '../Components/contractors/WorkOrders';
import ContractorCard from './ContractorCard';
import {fetchAllContractors} from '../Slice/homecontractor-slice'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect} from "react"
import '../Margin.css';
import './Home.css';

export const Home = () => {
  const dispatch = useDispatch();
  const contractors = useSelector(state => state.homecontractorSlice);



  useEffect(() => {
    dispatch(fetchAllContractors())

  }, [dispatch])

  if(contractors.status !== 'done'){
    return <p>Loading...</p>
  }

  return (
    <div className='container__home'>

      <div className='container__homepic'>
        <img src='https://digitaltrades.com.au/wp-content/uploads/2019/11/Handyman-Services.jpg' alt='handyman' />
      </div>
      <div className='container__home--data'>
          <h2>One place, All the workers</h2>
        <div className='container__homepic__question'>
          <img src='https://www.kindpng.com/picc/m/71-716889_question-mark-bracket-clip-art-man-sitting-on.png' alt='guess'/>
          <div className='container__homepic__question--text'>
            <p>Have a broken window?</p>
            <p>Need a room painted?</p>
            <p>Need new floor in the house?</p>
            <p>Do I know a handyman?</p>
          </div>
        </div>
        <p>Come find all of our TradeJacks</p>
        <h3>A few of our best contractors:</h3>
      </div>
      <div className='contractor-holder'>

        {contractors.entities.map(contractor => (
          <ContractorCard contractor={contractor} key={contractor.id}/>
        ))}
      </div>
    </div>
  )
}

export const ClientHome = () => {
  const username = localStorage.getItem('username');
  return (
    <div className='container__clienthome'>
      <h2 style={{textTransform:'capitalize',marginTop: '10px'}}>Hi {username}!</h2>
      <h3 style={{marginTop: '0', textTransform:'capitalize'}}>Your friendly client Home Page</h3>
      <WorkorderList/>
      <></>
    </div>
  )
}

export const ContractorHome = () => {
  const username = localStorage.getItem('username');
  return (
    <div className='container__contractorhome'>
      <h2 style={{margin: '0px'}}>{username}</h2>
      <h3 style={{margin: '0.1rem'}}>Your friendly Contractor Home Page</h3>
      <WorkOrders />
    </div>
  )
}

