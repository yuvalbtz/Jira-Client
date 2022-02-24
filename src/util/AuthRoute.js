import React, { useContext } from 'react'
import {useNavigate, Navigate} from 'react-router-dom';
import {AuthContext} from '../context/auth'

function AuthRoute({children}) {

  const {user} = useContext(AuthContext)
  
  console.log('user1', user);
  
 
return !user ? children : <Navigate to="/userPage" />;

 }
 
 export default AuthRoute;