import { useQuery } from '@apollo/client';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Container, Divider, Grid, IconButton, LinearProgress, Typography } from '@mui/material';
import React from 'react';
import { GET_AVATARS_RAPPERS, GET_MUSICS_PAGE_INFO } from '../graphQL/Query';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowBack, MusicNote } from '@mui/icons-material';

const MusicPage = () => {
  const back=useNavigate()
    const MusicPageINFO=useQuery(GET_MUSICS_PAGE_INFO)
    const RappersAvatars=useQuery(GET_AVATARS_RAPPERS); 
    console.log(RappersAvatars) 
    return (<>
        <Container maxWidth="xl">
            <Grid container>
            <Grid item xs={12} md={3}>
              {
                RappersAvatars.loading?
                <Box m={2} >
            <LinearProgress color='secondary'  />
             </Box>
             :
             
            <Box sx={{borderRadius:"30px",p:0.4,position:"sticky",top:"0.8rem",m:1.5 , bgcolor:" rgba(255, 255, 255, 0.29)"}}>
             {RappersAvatars.data.rapers.map((rapper,i)=><div key={rapper.name}>
                    <Box sx={{display:"flex",alignItems:"center",m:1,p:1}}>
                       <Link to={`/Rappers/${rapper.slug}`}> <Avatar src={rapper.avatar.url}/></Link>
                       <Link to={`/Rappers/${rapper.slug}`} style={{color:"white",textDecoration:"none"}}> <Typography variant='h6' component="span" ml={2} color="secondary">{rapper.name}</Typography> </Link>
                    </Box>
                     {i<RappersAvatars.data.rapers.length-1&& 
                     <Grid item xs={12}>
                     <Divider variant="middle" />
                  </Grid>}
                   </div>
                )}
            </Box>
              }
              </Grid>
            <Grid item xs={12} md={9} sx={{minHeight:"100vh"}}>
            <Box sx={{display:"flex",justifyContent:"space-between",mt:2}}>
                    <IconButton onClick={()=>back(-1)}><ArrowBack sx={{fontsize:"60px"}}/></IconButton>
                    <IconButton disabled><MusicNote sx={{fontsize:"60px"}} /></IconButton>
                  </Box>
             {MusicPageINFO.loading?
             <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"100vh"}}>
            <CircularProgress color='secondary' />
             </Box>: <Box sx={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
             {
                MusicPageINFO.data.musics.map(music=>
                    <Card key={music.title} sx={{ maxWidth: 250 ,bgcolor:" rgba(255, 255, 255, 0.29)",backdropFilter: "blur(10.7px)",border: "1px solid rgba(255, 255, 255, 0.3)" ,m:1,boxShadow:"0 3px 6px rgba(1,1,1,0.16), 0 3px 6px rgba(0,0,0,0.23)"}}>
                    <CardMedia
                     component="img"
                     alt={music.name}
                     height="240"
                     image={music.coverMusic.url}
                      />
                      <CardContent>
                      <Typography variant='h5' mb={1}>{music.title}</Typography>
                      <Grid item xs={12}>
                        <Divider variant="middle" />
                     </Grid>
                        <Box sx={{display:"flex" ,alignItems:"center",mt:0.7}}>
                        <Avatar src={music.raper.avatar.url} sizes='medium'/>
                       <Typography variant='h6' component="h1" sx={{marginLeft:"8px"}}>{music.raper.name}</Typography>
                        </Box>                    
                      </CardContent>
                      <Grid item xs={12}>
                        <Divider variant="middle" />
                     </Grid>
                      <CardActions sx={{display:"block"}} >
                      <Link to={`/MusicPage/${music.slug}`} style={{color:"white",textDecoration:"none"}}><Button variant="outlined" color='secondary' sx={{width:"100%"}} >PlayMusic & Lyrics</Button></Link> 
                      </CardActions>
                    </Card>)
             }
            </Box>
             }
            </Grid>
            
            </Grid>
        </Container>
        </>
    );
};

export default MusicPage;