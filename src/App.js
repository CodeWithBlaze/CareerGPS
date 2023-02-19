import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppNavigator from './AppNavigator';
import { auth } from './config/firebase';
import UserContext from './context/UserContext';
import Home from './pages/Home';
import Register from './Register'

function App() {
  const [user,setUser] = useState(false)
  
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user)
        setUser(user)
      else
        setUser(false)
      
    })
  },[])
  return (
    <UserContext.Provider value={{user,setUser}}>
      <Routes>
        <Route path='/*' element={user?<AppNavigator/>:<Home/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/register/*' element={<Register/>}/>
      </Routes>
    </UserContext.Provider>
  )
}

export default App;
