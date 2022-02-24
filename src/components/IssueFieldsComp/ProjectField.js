import { Autocomplete, TextField } from '@mui/material'
import React from 'react'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';

function ProjectField({setIssueDetails, issueDetails}) {
   
const [options, setOptions] = React.useState([])


   React.useEffect(() => {
           
      axios({method:'get',url:'/getAllProjectTypes'})
          .then(({data}) => {
            setIssueDetails({
               ...issueDetails,  
               projectKey: data.message.projects[0].key,
               projectName: data.message.projects[0].name,
               projectId: data.message.projects[0].id
               }) 
           console.log("sdata",data.message);
           setOptions(data.message.projects.map(({name, id, key}) => ({name, id, key})))
          
          })
          .catch((err) => {
           console.log(err);
          }) 
        
         
    
     },[])



  function onSelectTag(e, value) {
        
      setIssueDetails({
         ...issueDetails,  
         projectKey:value.key,
         projectName: value.name,
         projectId: value.id
         })
         console.log(issueDetails);
         }
    
    
    return (
       <>
       {options[0] ?  <Autocomplete
        onChange={onSelectTag}
        disablePortal
        getOptionLabel={(option) => option.name}
        id="combo-box-project"
        defaultValue={options[0]}
        disableClearable
        options={options}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        renderInput={(params) => <TextField   {...params} label="project" />}
         /> : (<CircularProgress sx={{ margin:'0 auto'}} size="2rem"/>)}
       </>
    )
}

export default ProjectField
