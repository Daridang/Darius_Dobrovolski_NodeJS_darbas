import React, { useEffect, useState, useContext } from 'react'
import { AppContext } from '../App'

function Timer({ itemData }) {

  const { socket } = useContext(AppContext)

  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [hours, setHours] = useState(0)
  const [days, setDays] = useState(0)

  const timeLeft = itemData.time * 60 * 60 * 1000

  useEffect(() => {
    const created = new Date(itemData.createdAt).getTime()
    const deadline = created + timeLeft
    const timer = setInterval(function () {

      const now = new Date().getTime()
      const t = deadline - now
      let d = Math.floor(t / (1000 * 60 * 60 * 24))
      let h = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      let m = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60))
      let s = Math.floor((t % (1000 * 60)) / 1000)

      setDays(d)
      setHours(h)
      setMinutes(m)
      setSeconds(s)

      if (t < 0) {
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
    // socket.on('connect', () => {
    //   console.log('onconnect: ', socket.id)
    //   socket.emit('runTimer', {
    //     id: itemData._id,
    //     created: itemData.createdAt,
    //     time: itemData.time
    //   })
    // })

    // socket.on('timer', (arg) => {

    //   console.log('ontimer: ', arg)
    //   setDays(arg.d)
    //   setHours(arg.h)
    //   setMinutes(arg.m)
    //   setSeconds(arg.s)
    // })

    // socket.on('stop', () => {
    //   console.log('onstop')
    //   socket.off('timer')
    // })

    // return () => {
    //   socket.off("connect");
    //   socket.off("timer");
    // };

  }, [])

  return (
    <p>
      {
        `${days}d:${hours > 9 ? hours : '0' + hours}h:${minutes > 9 ? minutes : '0' + minutes}m:${seconds > 9 ? seconds : '0' + seconds}s`
      }
    </p>
  )
}

export default Timer