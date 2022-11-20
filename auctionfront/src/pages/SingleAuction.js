import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import BidsTable from '../components/BidsTable'
import Timer from '../components/Timer'
import '../style/single-auction.css'

function SingleAuction() {
  const [auction, setAuction] = useState()
  const [timeLeft, setTimeLeft] = useState()

  const { id } = useParams('id')

  const navigate = useNavigate()

  useEffect(() => {
    getAuction()
  }, [])

  useEffect(() => {
    if (auction) {
      console.log('created: ', new Date(auction.createdAt).toLocaleString())
    }
  }, [auction])

  const onBack = () => {
    navigate('/auctions')
  }

  const getAuction = async () => {
    const response = await fetch(
      'http://localhost:5000/auctions/' + id,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      }
    )

    console.log('response: ', response)
    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const data = await response.json()
    console.log('setAuction: ', data)
    setAuction(data)
  }


  return (
    <div className='shdw'>
      {/* <h2>Single Auction</h2> */}
      <div className='auction-wrapper shdw'>

        <img src={auction ? auction.image : 'https://fakeimg.pl/400x400'} alt='Auction item' />

        <div className='auction-wrapper__info'>
          <h3>{auction ? auction.title : ''}</h3>
          <Timer />
          <p><span>Time left: </span>{auction ? auction.time : ''}</p>
          <p><span>Price: </span>{auction ? auction.startPrice : ''} Eur</p>
          <p><span>Bids: </span>{auction ? auction.bids.length : '0'}</p>
          <BidsTable auctionId={id} />
        </div>
      </div>
      <button onClick={onBack}>Back</button>
    </div>
  )
}

export default SingleAuction