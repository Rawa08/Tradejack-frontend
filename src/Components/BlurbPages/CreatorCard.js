import './CreatorCard.css'
export const CreatorCard = ({ creator }) => {

  return (
    <div className='creatorCard'>
      <div className='imageholder'>
        <img className='creatorCard__img' src={creator.img} alt="Look children its a naked baboon" />
      </div>
      <div className='creatorCard__info'>
        <h4>{creator.name}</h4>
        <p>{creator.blurb}</p>
      </div>
    </div>
  )
}