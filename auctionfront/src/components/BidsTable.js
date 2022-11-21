import React, { useRef, useState, useEffect } from 'react'
import BidListItem from './BidListItem'
import '../style/bids-table.css'

function BidsTable({ auctionId }) {
  const getBidsUrl = `http://localhost:5000/bids/${auctionId}`

  const [bids, setBids] = useState([])
  const [bidErr, setBidErr] = useState()
  const amountInput = useRef()

  const getBids = async () => {
    const response = await fetch(getBidsUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')
          }`
      }
    })
    if (!response.ok) {
      console.log('wtf: ', response)
    }
    const data = await response.json()
    const sorted = data.sort((a, b) => b.bidValue - a.bidValue)
    setBids([...sorted])
  }

  const bid = async () => {
    if (Number(bids.length > 0)) {
      if (Number(amountInput.current.value) <= Number(bids[0].bidValue)) {
        setBidErr('Amount must be greater than ' + bids[0].bidValue)
        return
      }
    }

    const response = await fetch(getBidsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')
          }`
      },
      body: JSON.stringify({
        bidName: localStorage.getItem('username'),
        bidValue: amountInput.current.value
      })
    })
    if (!response.ok) {
      console.log('wtf bid: ', response)
    }
    // const data = await response.json()
    getBids()
  }

  useEffect(() => {
    getBids()
  }, [])

  return (
    <div className='shdw'>
      <h4>BidsTable</h4>
      <div className='bids-list'>

        {
          bids && bids.map((item, index) => {
            return <BidListItem key={index} data={item} />
          })
        }

      </div>
      <div className='bid-menu'>
        <p>{bidErr}</p>
        <input
          onFocus={() => setBidErr('')}
          ref={amountInput}
          type="number"
          min="0.00" max="10000000000.00"
          step="0.01"
          placeholder='Bid amount' ></input>
        <button onClick={bid}>Bid</button>
      </div>
    </div>
  )
}

export default BidsTable