import React from 'react'
import { Button, Container, FormControl, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {AuthContext} from '../context/auth'
import CircularProgress from '@mui/material/CircularProgress';


function Login() {
    

    const [errors, setErrors] = React.useState({})
    
    const [loading, setLoading] = React.useState(false)
   
    const {login} = React.useContext(AuthContext)

    const [loginInfo, setLoginInfo] = React.useState({
        host:'',
        email:'',
        apiToken:'',
        showPassword:false,
    })

    
    const isEmpty = !Object.values(loginInfo).every(x => ( x !== '' )); 
    
    function handleChange(e){
       setLoginInfo({...loginInfo, [e.target.name]:e.target.value})
       console.log(loginInfo);
    }


    const handleClickShowPassword = () => {
        setLoginInfo({
          ...loginInfo,
          showPassword: !loginInfo.showPassword,
        });
      };





    function handleSubmit(e){
       e.preventDefault()
       setLoading(true)
   
    axios({method:'post',url:'/login',
     data:{
        host:`https://${loginInfo.host}.atlassian.net`,
        email:loginInfo.email,
        apiToken:loginInfo.apiToken
    }})
     .then(({data}) => {
      console.log(data.message);
      login(data.message)
      setLoading(false)
    
       })
     .catch((error) => {
      console.log("error",error.response.data.message);
      setErrors({
        ...errors,
        credentials:error.response.data.message
      })
      setLoading(false)
     
     })
    }

    
  return (
        <Container 
          disableGutters 
          fixed  
          sx={{ 
              height:'100vh',
              display:'flex',
              justifyContent:'center',
              flexDirection:'column',
              alignItems:'center'
              }}
            >
          
          <Typography variant="h3" color="primary">
              Jira Client
          </Typography>
          
      
           <Box 
              sx={{
                    border:'1px solid black',
                    width: '90%',
                  }}
              display="flex" 
              flexDirection="column" 
              alignItems="center"
           >
            
           <form noValidate onSubmit={handleSubmit}>
        <FormControl
          sx={{ m: 1, width: '90%' }}
            >
              <TextField
                name="host"
                label="host name"
                variant='standard'
                color="primary"
                value={loginInfo.host}
                onChange={handleChange}
              />

              
           </FormControl>         
               
         <FormControl
           sx={{  m: 1, width: '90%' }}
            >
              <TextField
                name="email"
                label="email"
                variant='standard'
                type="email"
                color="primary"
                value={loginInfo.email}
                onChange={handleChange}
              />

              
           </FormControl>
           
           <FormControl sx={{  m: 1, width: '90%' }} >
           <TextField
              id="standard-adornment-password"
              label="apiToken"
              autoComplete="on"
              type={loginInfo.showPassword ? 'text' : 'password'}
              name="apiToken"
              value={loginInfo.apiToken}
              onChange={handleChange}
              variant="standard"
              InputProps={{
                  endAdornment:(
                      <InputAdornment position="end">
                        <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                >
                  {loginInfo.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
                )
            }}
          />
        </FormControl>
           
           <FormControl
            sx={{padding:'15px', width:'90%'}}
           >
            
             {loading ? (<CircularProgress color="primary" sx={{margin:'0 auto'}}/>) : ( 
            
            <Button
                sx={{textTransform:'none'}} 
                onSubmit={handleSubmit}
                variant="contained"
                disabled={isEmpty}
                type="submit"
              >
              Login
             </Button> )}
           </FormControl>
           </form> 
           {errors.credentials && (
             <Typography padding="5px" color="red">
             {errors.credentials}
              </Typography> 
           )}
             
           </Box>
             
             <Typography variant="subtitle1" sx={{marginTop:'3px'}}>
               Developed By Yuval Ben-Tzur 
             </Typography>
            
            <Typography  variant="subtitle2" >
            All Rights Reserved@{new Date().getFullYear()}
            </Typography>
           
           </Container>
    )
}

export default Login
