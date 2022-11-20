import { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auctions from './pages/Auctions';
import Auth from './pages/Auth';
import SingleAuction from './pages/SingleAuction';
import './style/style.css';

export const AppContext = createContext(null)

function App() {

  const [user, setUser] = useState()

  useEffect(() => {
    const obj = localStorage.getItem('username')
    if (obj) {
      setUser({ name: obj })
    }
  }, [])

  return (
    <BrowserRouter>
      <AppContext.Provider className='app shdw' value={
        { user, setUser }
      }>

        <Routes>
          <Route path='/' element={<Auth />} />
          <Route path='/auctions' element={<Auctions data={user} />} />
          <Route path='/auctions/:id' element={<SingleAuction />} />
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
