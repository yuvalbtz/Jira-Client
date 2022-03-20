import axios from 'axios'
import React from 'react'
import AppBar from '../components/AppBar'
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system'
import { Button, Container, FormControl } from '@mui/material';
import ProjectField from '../components/IssueFieldsComp/ProjectField'
import IssueTypeField from '../components/IssueFieldsComp/IssueTypeField'
import CustomField from '../components/IssueFieldsComp/CustomFields'
import SnackBarMessage from '../components/SnackBar'
import CircularProgress from '@mui/material/CircularProgress';

function UserPage() {
    
     const [snackMessage, setSnackMessage] = React.useState('')
     const [snackBarOpen, setSnackBarOpen] = React.useState(false)
     const [loading, setLoading] = React.useState(false)

    const [issueDetails, setIssueDetails] = React.useState({
        projectId:'',
        projectKey:null,
        projectName:'',
        issueTypeName:'',
        summary:'',
        description:'',
     })
    
   const isEmpty = !Object.values(issueDetails).every(x => ( x !== '' && x !== null)); 
    
    console.log('isEmpty', isEmpty);
     
   function handleChange(e){
        setIssueDetails({
          ...issueDetails, 
          [e.target.name]:e.target.value
        })
      //console.log(issueDetails);
        
     }
  
     function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
     axios({method:'post',url:'/createIssue',data:issueDetails})
      .then(({data}) => {
       console.log(data.message);
       setSnackMessage(`Issue ${data.message.key} Was Created Succesfully!`)
       setSnackBarOpen(true)
       setLoading(false)
      
      setIssueDetails({
        ...issueDetails,
        summary:'',
        description:'',
      })
      })
      .catch((err) => {
       console.log(err);
       setLoading(false)

      })
     }
    
    
    
    return (
        <>
        <AppBar />   
        <Container 
        disableGutters 
        fixed  
        sx={{ 
            height:'100vh',
            display:'flex',
            justifyContent:'center',
            flexDirection:'column',
            alignItems:'center'
            }}>
         <Box 
           sx={{
            border:'1px solid black',
            height: '100%',
            width: '100%'
          }}
          display="flex" 
          flexDirection="column"
           justifyContent="center" 
           alignItems="center"
           >
        

        <form noValidate onSubmit={handleSubmit}>
        <FormControl
               sx={{ m: 1, width: '90%',textAlign:'center' }}
            >
         <ProjectField 
          setIssueDetails={setIssueDetails}
          issueDetails={issueDetails}
         />
        </FormControl>
        
        <FormControl
               sx={{ m: 1, width: '90%',textAlign:'center' }}
            >
        <IssueTypeField
         setIssueDetails={setIssueDetails}
         issueDetails={issueDetails}
        />
       </FormControl> 
        
        <FormControl
          sx={{ m: 1, width: '90%' }}
            >
              <TextField
              name="summary"
              label="summary"
              variant='standard'
              color="primary"
              value={issueDetails.summary}
              onChange={handleChange}
              />
              </FormControl>

   

              <FormControl
               sx={{ m: 1, width: '90%' }}
            >
              <TextField
              name="description"
              label="description"
              multiline
              maxRows={4}
              variant='standard'
              color="primary"
              value={issueDetails.description}
              onChange={handleChange}
              />
              </FormControl>



              <FormControl
               sx={{ m: 1, width: '90%' }}
               >
              <CustomField 
               setIssueDetails={setIssueDetails}
               issueDetails={issueDetails}
              />

             </FormControl>

             <FormControl
              sx={{padding:'15px'}}
           >
              {loading ? (
                  <CircularProgress/>
              ) : (<Button 
              sx={{textTransform:'none'}} 
              onClick={handleSubmit}
              onSubmit={handleSubmit}
              variant="contained"
              disabled={isEmpty}
              type="submit"
              >
               Create Issue
             </Button> )}
           </FormControl>
        
           </form>
         </Box>

        <SnackBarMessage 
        message={snackMessage} 
        open={snackBarOpen}
        setOpen={setSnackBarOpen}
        />
        
         </Container>
    </>
        
    )
}

export default UserPage
