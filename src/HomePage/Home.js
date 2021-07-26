import { WorkorderList } from "../Components/clients/WorkorderList";
import {WorkOrders} from '../Components/contractors/WorkOrders'
import '../Margin.css';


export const Home = () => {
  return (
    <div className='container'>
      <h2>One place, All the workers</h2>

      <p>Have a broken window?</p>
      <p>Need a room painted</p>

      <p>Come find all of our TradeJacks</p>
    </div>
  )
}

export const ClientHome = () => {
  return (
    <div className='container'>
      <h2>Your friendly client Home Page</h2>

      <p>Fill with Lorem Ipsum about clients</p>

      <WorkorderList/>
      <></>
    </div>
  )
}

export const ContractorHome = () => {
  return (
    <div className='container'>
      <h2>Your friendly Contractor Home Page</h2>

      <p>Fill with Lorem Ipsum about Contractors</p>
      <WorkOrders />
    </div>
  )
}

