import { WorkorderList } from "../Components/clients/WorkorderList";

export const Home = () => {
  return (
    <div>
      <h2>Home Page</h2>

      <p>Fill with Lorem Ipsum</p>
    </div>
  )
}

export const ClientHome = () => {
  return (
    <div>
      <h2>Your friendly client Home Page</h2>

      <p>Fill with Lorem Ipsum about clients</p>

      <WorkorderList/>
      <></>
    </div>
  )
}

export const ContractorHome = () => {
  return (
    <div>
      <h2>Your friendly Contractor Home Page</h2>

      <p>Fill with Lorem Ipsum about Contractors</p>
    </div>
  )
}

