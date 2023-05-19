import { Avatar, Backdrop, Box, Button, CircularProgress, Container, Divider, Grid,Tooltip, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import poster from "../assets/poster-music.jpg"
import { useQuery } from '@apollo/client';
import { GET_AVATARS_RAPPERS } from '../graphQL/Query';
import { Link } from 'react-router-dom';
const HomePage = () => {

    const RappersAvatars=useQuery(GET_AVATARS_RAPPERS);  
    const [alarm,setAlarm] =React.useState("")
  const [open, setOpen] = React.useState(false);
  useEffect(()=>{
   setOpen(true)
  },[])
  const handleClose = () =>{
    setOpen(false);
  };
  setTimeout(() => {
     setAlarm("welcome")
  }, 1000);
return (
       <>
       <Container maxWidth="xl" sx={{p:2}}>
        <Grid container>
         <Grid item xs={12} mb={2} >
            <Tooltip followCursor title="Go to Music List">
            <Link to="/MusicPage"><Box component="img" src={poster} sx={{width:"100%",height:"100%",borderRadius:"20px"}}></Box></Link>
            </Tooltip>
         </Grid>
         <Grid item xs={12}>
         <Divider variant="middle" />
         </Grid>
         <Grid item xs={12} p={7} >
         {RappersAvatars.loading?
           <CircularProgress />:<>
           <Tooltip title="Go To Rappers List" arrow>
           <Link to="/Rappers" style={{color:"white",textDecoration:"none"}}><Button variant="contained" color='secondary' sx={{fontStyle:"italic",m:3}} >Rappers</Button></Link>
           </Tooltip>
           <Grid item xs={12} justifyContent="center"  style={{display:"flex",flexWrap:"wrap",alignItems:"center"}}> 
            { RappersAvatars.data.rapers.map(a=><Tooltip key={a.id} arrow title={a.name}><Link to={`./Rappers/${a.slug}`}> <Avatar key={a.id} src={a.avatar.url} sx={{width:"145px",height:"145px"}}/></Link></Tooltip>)}
           </Grid>
           </>
            }
         </Grid>
         <Grid item xs={12}>
         <Divider variant="middle" />
         </Grid>
        </Grid>
       </Container>
       {/* ///---backdrop--- */}
       <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
         {
            alarm.length?<Typography variant='h4'>Welcome To RepfaBlog</Typography>
            :
            <CircularProgress color="inherit" />
         }
          
      
      </Backdrop>
       </>
    );
};

export default HomePage;