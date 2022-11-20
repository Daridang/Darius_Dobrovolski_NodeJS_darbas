import React, { useRef, useContext, useState, useEffect } from 'react'
import { AppContext } from '../App'
import '../style/upload.css'

function UploadAuction({ onUpload }) {
  const { user } = useContext(AppContext)
  const [auction, setAuction] = useState()

  const imageInput = useRef()
  const titleInput = useRef()
  const hoursInput = useRef()
  const priceInput = useRef()

  useEffect(() => {
    if (auction) {
      upload()
    }
  }, [auction])


  function submit(e) {
    e.preventDefault()
    const obj = {
      image: imageInput.current.value,
      title: titleInput.current.value,
      time: hoursInput.current.value,
      startPrice: priceInput.current.value
    }

    setAuction(obj)
  }
  const upload = async () => {
    const response = await fetch(
      'http://localhost:5000/auctions/create',
      {
        method: 'POST',
        body: JSON.stringify(auction),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      }
    )

    if (!response.ok) {
      const data = await response.json()
      console.log(data)
      throw new Error(response.statusText)
    }

    const data = await response.json()
    console.log('Created: ', data)
    onUpload()
  }

  return (
    <div className='upload shdw'>
      <h2>Upload auction</h2>
      <form className='upload__form' onSubmit={submit}>
        <input
          ref={imageInput}
          type="text"
          placeholder='Image url'
          defaultValue={'https://fakeimg.pl/200x100'}></input>

        <input
          ref={titleInput}
          type='text'
          placeholder='Title'></input>

        <input
          ref={hoursInput}
          type='number'
          min="1" max="48"
          placeholder='min 1 max 48 Hours'
          step="1"></input>

        <input
          ref={priceInput}
          type="number"
          min="0.00" max="10000000000.00"
          step="0.01"
          placeholder='Start price' ></input>

        <input type='submit'></input>
      </form>
    </div >
  )
}

export default UploadAuction