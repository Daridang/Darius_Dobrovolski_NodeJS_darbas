import React from 'react'
import '../style/card.css'

function AuctionItem({ data, onClick }) {

  console.log('auction data: ', data)

  return (
    <div className='card shdw' onClick={onClick}>
      <img src={data.image ? data.image : 'https://fakeimg.pl/200x100'} alt="Auction item" />

      <div className='card__info'>
        <h3>{data.title}</h3>
        <p><span>Time left: </span>{data.time}</p>
        <p><span>Price: </span>{data.startPrice} Eur</p>
        <p><span>Bids: </span>{data.bids.length}</p>
      </div>
    </div>
  )
}

export default AuctionItem