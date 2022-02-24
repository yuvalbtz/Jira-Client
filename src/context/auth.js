import React, { useReducer, createContext } from 'react';
import axios from 'axios';
import SplashScreen from '../components/SplashScreen' 
import { useNavigate } from 'react-router';



const initialState = {
  user: null
};


const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {}
});

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);
   
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    setLoading(true)
    axios({method:'get',url:'/getCurrentUser'})
     .then((data) => {
      console.log(data.data.message);
      login(data.data.message)
      setLoading(false)
     }) 
     .catch((err) => {
        console.log(err.response.data.message);
        setLoading(false)
        logout() 
      
      
      })

    

    },[])



  function login(userData) {
    dispatch({
      type: 'LOGIN',
      payload: userData
    });
  }

  function logout() {
    dispatch({ type: 'LOGOUT' });
  }

  return (
   <>
     {loading && ( <SplashScreen open={loading}/>)}
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
    </>
  );
}

export { AuthContext, AuthProvider };
