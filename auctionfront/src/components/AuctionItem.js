import React from 'react'
import '../style/card.css'
import Timer from './Timer'

function AuctionItem({ data, onClick }) {

  console.log('auction data: ', data)

  return (
    <div className='card shdw' onClick={onClick}>
      <img src={data.image ? data.image : 'https://fakeimg.pl/200x100'} alt="Auction item" />

      <div className='card__info'>
        <h3>{data.title}</h3>
        <div><p><span>Time left: </span></p>{<Timer itemData={data} />}</div>
        <p><span>Price: </span>{data.startPrice} Eur</p>
        <p><span>Bids: </span>{data.bids.length}</p>
      </div>
    </div>
  )
}

export default AuctionItem