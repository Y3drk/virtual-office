import React from "react";
import {Route, Routes} from "react-router-dom";
import {LogIn} from "./components/LogIn";
import {Office} from "./components/Office";

function App() {
    return (
        <Routes>
            <Route path="/" element={<LogIn/>}/>
            <Route path="/office" element={<Office/>}>

            </Route>
            <Route path="*" element={<LogIn/>}/>
        </Routes>
    );
}

export default App;
