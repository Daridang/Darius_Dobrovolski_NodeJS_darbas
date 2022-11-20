import React, { useState } from 'react'
import Login from '../components/Login';
import Register from '../components/Register';

function Auth() {
  const [btnText, setBtnText] = useState('Register')
  const [isLogin, setIsLogin] = useState(true)

  function switchForm() {
    setIsLogin(!isLogin)
    if (isLogin) {
      setBtnText('Login')
    } else {
      setBtnText('Register')
    }
  }
  return (
    <div className='auth'>
      <h3>Auth</h3>
      {
        isLogin ? <Login /> : <Register />
      }

      <button onClick={switchForm}>{btnText}</button>
    </div>
  )
}

export default Auth