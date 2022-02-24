import { Avatar, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router';
import { AuthContext } from '../../context/auth';

function Index() {
   const navigate = useNavigate()
   const {user, logout} = useContext(AuthContext)
    
    const settings = ['Logout'];
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
  
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
   
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
      };
   
      function handleLogout(){
        
        axios({method:'post',url:'/logout'})
      .then(({data}) => {
       console.log(data.message);
       logout() 
       navigate('/')
       console.log('home');
       })
      .catch((err) => console.log(err)) 
      
    }
   
    return (
        <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="Remy Sharp" src={user && user.avatarUrls["32x32"]} />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleLogout}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    )
}

export default Index
