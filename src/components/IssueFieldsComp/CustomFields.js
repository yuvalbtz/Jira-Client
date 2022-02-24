import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import React from 'react'
import axios from 'axios'

function CustomFields({setIssueDetails, issueDetails}) {
    
    const [customFields, setCustomFields] = React.useState({})

     const keyProps = {
        projectKeys:issueDetails.projectKey,
        issuetypeNames:issueDetails.issueTypeName
     }

     React.useEffect(() => {
         
               
        axios({method:'get',url:`/getAllProjects/${keyProps}`, 
        params:{
          KEY:keyProps
        }
      })
            .then(({data}) => {
            console.log("custom data",data.message);
            if(data.message.projects[0].issuetypes.length > 0 &&  data.message.projects[0].issuetypes[0].hasOwnProperty("fields")){
                setCustomFields({})
                setCustomFields(data.message.projects[0].issuetypes[0].fields)
            }
            
            
              })
            .catch((err) => {
             console.log(err);
             
            }) 
      
      
       },[issueDetails.issueTypeName])
    
   React.useEffect(() => {
    if(!customFields.hasOwnProperty("customfield_10040")){
        delete issueDetails.customfield_10040
    }else{
        setIssueDetails({
            ...issueDetails,  
            customfield_10040: null
            })  
    } 
   },[customFields])



    function onSelectTag(e, value) {
        console.log(value.value);
        setIssueDetails({
         ...issueDetails,  
         customfield_10040: value.value
         })
         }
    
    
    return (
        customFields && customFields.hasOwnProperty("customfield_10040") && customFields.customfield_10040.schema.type === "option" && (
            <Autocomplete
            onChange={onSelectTag}
            disablePortal
            getOptionLabel={(option) => option.value}
            disableClearable
            isOptionEqualToValue={(option, value) => option.value === value.value }
            id="combo-box-CustomField"
            options={customFields.customfield_10040.allowedValues}
            renderInput={(params) => <TextField  {...params} label={customFields.customfield_10040.name} />}
             />
        )  

    )
}

export default CustomFields
