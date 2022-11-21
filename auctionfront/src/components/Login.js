import React, { useRef, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App'

function Login() {
  const { user, setUser } = useContext(AppContext)

  const navigate = useNavigate()
  const nameInput = useRef()
  const passInput = useRef()

  useEffect(() => {
    console.log('user: ', user)
    if (user && user.password) {
      login()
    }

  }, [user])

  const login = async () => {
    const response = await fetch(
      'http://localhost:5000/login',
      {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const data = await response.json()
    console.log('logged in: ', data)
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('username', data.name)

    navigate('/auctions')
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    const user = {
      name: nameInput.current.value,
      password: passInput.current.value
    }

    setUser(user)
  }
  return (
    <form className='login-form shdw' onSubmit={handleOnSubmit}>
      <h4>Log in</h4>
      <input ref={nameInput} type='text' placeholder='Name' required />
      <input ref={passInput} type='password' placeholder='Password' required />
      <input type='submit' />
    </form>
  )
}

export default Login