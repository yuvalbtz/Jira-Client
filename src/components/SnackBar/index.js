import React from 'react'
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import MuiAlert from '@mui/material/Alert';





function Index({message, open, setOpen}) {
 
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });
   
      function SlideTransition(props) {
        return <Slide {...props} direction="right" />;
      }
      
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };


    return (
        <div>
          <Snackbar
           open={open}
           onClose={handleClose}
           autoHideDuration={2000}
           TransitionComponent={SlideTransition}
           >
            <Alert 
            severity="success" 
            sx={{ width: '100%' }}
            onClose={handleClose}
            >
            {message}
            </Alert>
        
           </Snackbar>  
        </div>
    )
}

export default Index





  



