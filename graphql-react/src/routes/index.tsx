
import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Header from "../header"
import PeopleContainer from "../users/peoplePage/container";
import PersonContainer from "../users/personPage/container";

const AppRoutes = () => {
    return (
       
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<PeopleContainer/>}/>
                <Route path="/:id" element={<PersonContainer/>}/>
            </Routes>
        </Router>
        
    )
}

export default AppRoutes
