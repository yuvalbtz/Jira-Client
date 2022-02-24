import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import React from 'react'
import axios from 'axios'




function IssueTypeField({setIssueDetails, issueDetails}) {
    
    const [options, setOptions] = React.useState([])
    
    const keyProps = {
      projectKeys:issueDetails.projectKey,
    }
    
    
    React.useEffect(() => {
      
      setIssueDetails({
        ...issueDetails,  
        issueTypeName:""
        })   
               
      axios({method:'get',url:`/getAllProjects/${keyProps}`, 
      params:{
        KEY:keyProps
      }
    })
          .then(({data}) => {
           setOptions([])
           console.log("issues data",data.message);
           setOptions(data.message.projects[0].issuetypes.map(({name, subtask}) => ({name, subtask})).filter(({subtask}) => !subtask))
          
          })
          .catch((err) => {
           console.log(err);
          }) 

         
    
    
     },[issueDetails.projectName])





    function onSelectTag(e, value) {
      console.log(value);
        setIssueDetails({
        ...issueDetails,  
        issueTypeName: value.name
        })
        }
     

       
    
    return (
       <>
      {options[0] ? <Autocomplete
        onChange={onSelectTag}
        disablePortal
        id="combo-box-issueType"
        disableClearable
        isOptionEqualToValue={(option, value) => option.name === value.name}
        getOptionLabel={(option) => option.name}
        options={options}
        renderInput={(params) => <TextField  {...params}  label="issue Type" />}
       /> : (<CircularProgress sx={{ margin:'0 auto'}} size="2rem"/>)}
      </>
    )
}

export default IssueTypeField
