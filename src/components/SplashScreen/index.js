import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material';


function Index({open}) {
    return (
      
          <Backdrop
           sx={{ color: '#fff',backgroundColor:'#1976D2', display:'flex', flexDirection:'column', zIndex: (theme) => theme.zIndex.drawer + 1 , width:'300px'}}
           open={open}       
          >
          <Typography>
           Connecting To Your Account...
           </Typography>
           <CircularProgress color="inherit" />
         </Backdrop>  
      
    )
}

export default Index
