import React, { useRef, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App'

function Register() {
  const navigate = useNavigate()
  const { user, setUser } = useContext(AppContext)

  const nameInput = useRef()
  const passInput = useRef()
  const repeatPassInput = useRef()

  useEffect(() => {
    console.log('user: ', user)
    if (user) {
      register()
    }

  }, [user])

  const register = async () => {
    const response = await fetch(
      'http://localhost:5000/register',
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
    console.log('Registered: ', data)
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('username', data.name)

    navigate('/auctions')
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    const user = {
      name: nameInput.current.value,
      password: passInput.current.value,
      confirmPassword: repeatPassInput.current.value
    }

    setUser(user)

  }

  return (
    <form className='register-form shdw' onSubmit={handleOnSubmit}>
      <h4>Register</h4>
      <input ref={nameInput} type='text' placeholder='Name' required />
      <input ref={passInput} type='password' placeholder='Password' required />
      <input ref={repeatPassInput} type='password' placeholder='Password' required />
      <input type='submit' />
    </form>
  )
}

export default Register