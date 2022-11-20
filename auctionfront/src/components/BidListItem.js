import React from 'react'
import '../style/bid-list-item.css'

function BidListItem({ data }) {
  return (
    <div className='bid-list-item'>
      <p>{data.bidName}:</p>
      <p>{data.bidValue} Eur</p>
    </div>
  )
}

export default BidListItem