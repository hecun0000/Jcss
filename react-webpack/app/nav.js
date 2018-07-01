import React from 'react';
import { NavLink } from 'react-router-dom';

 const NavBar=()=>{
      return <div>
         <div>
            <NavLink exact to="/" >这是A 页面</NavLink>  &nbsp;&nbsp;
            <NavLink to="/b" >这是 b 页面</NavLink>      &nbsp;&nbsp;
            <NavLink  to="/c" >这是 c 页面</NavLink>          
        </div>   

     </div>
 }


 export default NavBar;
 