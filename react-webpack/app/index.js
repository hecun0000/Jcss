import React from 'react';
import ReactDOM from 'react-dom';
import Hecun from './hecun';
import Hecun2 from './hecun2';
import Hecun3 from './hecun3';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Nav from './nav'
import './app.css'


ReactDOM.render(
    <Router>
        <div>
            <Nav/>
            <Route path="/" exact component={Hecun}/>
            <Route path="/b" component={Hecun2}/>
            <Route path="/c" component={Hecun3}/>
        </div>
    </Router>,
    document.getElementById("app")

)