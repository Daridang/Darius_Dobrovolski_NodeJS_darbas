import React, { useEffect, useState, useContext } from 'react'

function Timer({ itemData }) {

  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [hours, setHours] = useState(0)
  const [days, setDays] = useState(0)

  const timeLeft = itemData.time * 60 * 60 * 1000

  useEffect(() => {
    const created = new Date(itemData.createdAt).getTime()
    const deadline = created + timeLeft

    let t = 0

    const timer = setInterval(function () {

      const now = new Date().getTime()
      t = deadline - now
      if (t < 0) return
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

  }, [itemData])

  return (
    <p>
      {
        `${days}d:${hours > 9 ? hours : '0' + hours}h:${minutes > 9 ? minutes : '0' + minutes}m:${seconds > 9 ? seconds : '0' + seconds}s`
      }
    </p>
  )
}

export default Timer