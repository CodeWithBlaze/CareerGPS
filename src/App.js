import { useState } from 'react';
import AppNavigator from './AppNavigator';
import Register from './Register'

function App() {
  const [user,setUser] = useState(false)
  return (
    user?<AppNavigator/>:<Register/>
  )
}

export default App;
