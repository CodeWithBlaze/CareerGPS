import { useState } from 'react';
import AppNavigator from './AppNavigator';
import Register from './Register'

function App() {
  const [user,setUser] = useState(true)
  return (
    user?<AppNavigator/>:<Register/>
  )
}

export default App;
