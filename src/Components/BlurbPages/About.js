import { CreatorCard } from "./CreatorCard"
import './About.css'
export const About = () => {


  const writers = [{
    name: 'Adam', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit', blurb: `Adam moved to Norway in late 2000 Something and found his passion for coding there.
  he has several projects under his belt and wants to help people fix windows!! He was very insistent `}, { name: 'Rawa', img: 'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80', blurb: 'Rawa started his coding journey in python, creating an e-commerce site. He has since expanded his knowledge into JS and wants to create products which help people' },
  { name: 'Oscar', img: 'https://images.unsplash.com/photo-1579380656108-f98e4df8ea62?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2687&q=80', blurb: 'Oscar\'s coding journey began with VBA and excel sheets. He enjoys catching flies with his tongue and jumping from leaf to leaf.' }]

  return (

    <div className="About">
      <h2 className="About__text">All about the project</h2>
      <p className="About__text--inset">During our time at salt we have been tasked with creating a new unicorn. Our idea, TradeJack. The one stop shop for clients to find contractors for their projects and home fixes!</p>
       <p className="About__text--inset">  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tincidunt est non eros lobortis, sit amet pulvinar nulla consequat. Ut gravida, ipsum et gravida pulvinar, metus nisi egestas odio, eu malesuada urna nibh sit amet purus. Quisque quis enim ex. Maecenas at tristique orci. Sed dapibus vel mauris et fermentum. Nunc sed nunc sit amet ex malesuada ornare. Mauris fringilla mauris sit amet pellentesque euismod. Vivamus quis nisl arcu. Nulla ornare purus non arcu fermentum, pretium rhoncus magna condimentum. Nam vulputate felis eget dolor tempor, non rutrum nibh malesuada. Praesent ligula augue, imperdiet vel pharetra vel, condimentum ut elit. Fusce ante neque, fringilla vitae enim a, vestibulum dictum est. Aliquam condimentum tincidunt mollis.

        Pellentesque cursus lectus vel pharetra pellentesque. Nunc id lacus quis ipsum posuere faucibus. Aliquam fermentum arcu lorem, vel dictum nisi viverra vitae. Sed tristique dictum mattis. Integer nisl nunc, feugiat vitae lacus a, sagittis hendrerit eros. Vestibulum ipsum purus, fringilla vitae fermentum eu, blandit in ipsum. Aenean ultricies congue convallis. Suspendisse vestibulum eu augue at vehicula.
      </p>
      <h3 className='About__text'>The Creators</h3>
      <div className='creatorGallery'>
        {writers.map(creator => <CreatorCard key={creator.name} creator={creator} />)}
      </div>
    </div>
  )
}