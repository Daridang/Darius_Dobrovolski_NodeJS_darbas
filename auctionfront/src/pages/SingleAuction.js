import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../App'
import BidsTable from '../components/BidsTable'
import Timer from '../components/Timer'
import '../style/single-auction.css'

function SingleAuction() {
  const { timeLeft, setTimeLeft } = useContext(AppContext)
  const [auction, setAuction] = useState()

  const { id } = useParams('id')

  const navigate = useNavigate()

  useEffect(() => {
    getAuction()
  }, [])

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

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const data = await response.json()

    setAuction(data)
  }


  return (
    <div className='shdw'>

      <div className='auction-wrapper shdw'>

        <img src={auction ? auction.image : 'https://fakeimg.pl/400x400'} alt='Auction item' />

        <div className='auction-wrapper__info'>
          <h3>{auction ? auction.title : ''}</h3>
          <p><span>Time left: </span></p>
          <Timer itemData={auction ? auction : ''} />
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