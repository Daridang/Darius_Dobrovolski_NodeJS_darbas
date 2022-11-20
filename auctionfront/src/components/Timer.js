import React, { useEffect, useState } from 'react'

function Timer() {
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [hours, setHours] = useState(0)
  const [days, setDays] = useState(0)
  const demoTime = '2022-11-20T15:00:00.102Z'
  // const demoDate = new Date(demoTime)
  const demoDate = new Date()
  const demoHours = 48

  useEffect(() => {

    const created = demoDate.getTime()
    const hoursToMillis = demoHours * 60 * 60 * 1000
    const deadline = created + hoursToMillis

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

      console.log('seconds: ', s)

      if (t < 0) {
        clearInterval(timer)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      {
        `${days}d:${hours > 9 ? hours : '0' + hours}h:${minutes > 9 ? minutes : '0' + minutes}m:${seconds > 9 ? seconds : '0' + seconds}s`
      }
    </div>
  )
}

export default Timer