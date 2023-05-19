import React from 'react';
import { AppBar, Container, IconButton, Toolbar, Typography } from '@mui/material';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <Container maxWidth="xl" >
            <AppBar position='sticky'  sx={{borderRadius:"30px",width:"100%"}}>
                <Toolbar>
                   
                <Typography
                     variant='h6'
                      component="div"
                      sx={{flex:1,fontWeight:500}}
                     >
                     <Link to="/" style={{color:"white",textDecoration:"none"}}> RapfaBlog</Link>
                    </Typography>
                    <Link to="/" style={{color:"white",textDecoration:"none"}}> 
                    <IconButton>
                    <QueueMusicIcon fontSize='medium'/>
                    </IconButton>
                    </Link>
                </Toolbar>
            </AppBar>
         </Container>
    );
};

export default Navbar;