import { Route, Routes } from "react-router-dom";
import Journey from "./pages/Journey";

function AppNavigator(props) {
    return (
        <Routes>
            <Route path='/' element={<Journey/>}/>
            <Route path='/journey' element={<Journey/>}/>
        </Routes>
    );
}

export default AppNavigator;