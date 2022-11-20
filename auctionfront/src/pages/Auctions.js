import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App'
import AuctionItem from '../components/AuctionItem'
import UploadAuction from '../components/UploadAuction'
import '../style/auctions.css'

function Auctions() {
  const { user, setUser } = useContext(AppContext)
  const navigate = useNavigate()

  const [allAuctions, setAuctions] = useState([])

  useEffect(() => {
    auctions()
  }, [])

  function showAuctionDetails(id) {
    navigate('/auctions/' + id)
  }

  const auctions = async () => {
    const response = await fetch(
      'http://localhost:5000/auctions',
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
    setAuctions([...data])
  }

  return (
    <div className='auctions shdw'>
      <h2>Auctions</h2>

      <div>{user && <p>Logged in as {user.name}</p>}</div>

      <div className='main-container'>
        <div className='auctions-wrapper'>
          {
            allAuctions.map((auction, index) => {
              return <AuctionItem key={index} data={
                auction
              } onClick={() => showAuctionDetails(auction._id)} />
            })
          }

        </div>

        <UploadAuction onUpload={() => auctions()} />
      </div>
    </div>
  )
}

export default Auctions