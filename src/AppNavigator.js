import { Route, Routes } from "react-router-dom";
import Journey from "./pages/Journey";
import Profile from "./pages/Profile";

function AppNavigator(props) {
    return (
        <Routes>
            <Route path='/' element={<Journey/>}/>
            <Route path='/journey' element={<Journey/>}/>
            <Route path='/profile' element={<Profile/>}/>
        </Routes>
    );
}

export default AppNavigator;