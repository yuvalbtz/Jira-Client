import logo from './logo.svg';
import './App.css';
import Login from './pages/login'
import UserPage from './pages/userPage'
import {Routes} from 'react-router-dom'
import {Route} from 'react-router'
import axios from 'axios'
import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute'

function App() {
 
  axios.defaults.baseURL="http://localhost:8000"
  axios.defaults.withCredentials = true 
 
 return (
    <div className="App">
    <AuthProvider>
    
     <Routes>
      <Route 
     exact  
     path="/" 
     element={<AuthRoute><Login/></AuthRoute>}
     />
     <Route 
     exact
     path="/userPage" 
     element={ <UserPage/>}
     />
     </Routes>
    
    </AuthProvider>
    </div>
  );
}

export default App;
