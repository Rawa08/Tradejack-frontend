import { WorkorderList } from "../Components/clients/WorkorderList";
import '../Margin.css';


export const Home = () => {
  return (
    <div className='container'>
      <h2>Home Page</h2>

      <p>Fill with Lorem Ipsum</p>
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
    </div>
  )
}

