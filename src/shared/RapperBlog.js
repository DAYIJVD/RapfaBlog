import { useQuery } from '@apollo/client';
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GET_AVATARS_RAPPERS, GET_RAPPER_INFO } from '../graphQL/Query';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Container, Divider, Grid, IconButton, LinearProgress, Typography } from '@mui/material';
import { ArrowBack, MusicNote } from '@mui/icons-material';

const RapperBlog = () => {
    const back=useNavigate()
    const {slug}=useParams()
    const RapperInfo=useQuery(GET_RAPPER_INFO,{
        variables:{slug:slug}
    });
    const RappersAvatars=useQuery(GET_AVATARS_RAPPERS); 

    return (
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
             {RappersAvatars.data.rapers.map((rapper,i)=><>
                    <Box key={rapper.name} sx={{display:"flex",alignItems:"center",m:1,p:1}}>
                       <Link to={`/Rappers/${rapper.slug}`}> <Avatar src={rapper.avatar.url}/></Link>
                       <Link to={`/Rappers/${rapper.slug}`} style={{color:"white",textDecoration:"none"}}> <Typography variant='h6' component="span" ml={2} color="secondary">{rapper.name}</Typography> </Link>
                    </Box>
                     {i<RappersAvatars.data.rapers.length-1&& 
                     <Grid item xs={12}>
                      <Divider variant="middle" />
                   </Grid>}
                   </>
                )}
            </Box>
              }
              </Grid>
              <Grid item xs={12} md={9} mt={2}>
              <Box sx={{display:"flex",justifyContent:"space-between"}}>
                    <IconButton onClick={()=>back(-1)}><ArrowBack sx={{fontsize:"60px"}}/></IconButton>
                    <IconButton disabled><MusicNote sx={{fontsize:"60px"}} /></IconButton>
                  </Box>
              {
                RapperInfo.loading?
                <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"100vh"}}>
            <CircularProgress color='secondary' />
             </Box>
                :
                <Box sx={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                   <CardMedia
                  sx={{my:2,borderRadius:"15px"}}
          component="img"
          height="450"
          image={RapperInfo.data.raper.avatar.url}
          alt="green iguana"
        />
                   <Box sx={{p:2,color:"white"}}  dangerouslySetInnerHTML={{__html:RapperInfo.data.raper.description.html}}>

                   </Box>
                </Box>
              }
              </Grid>
              <Grid item xs={12} mt={4}>
                      <Divider variant="middle" />
            </Grid>
            <Grid item  m={2}>
            <Box component="span" sx={{py:1,px:2,width:"fit-content",display:"flex",alignItems:"center", backgroundColor:"white",mb:0,borderRadius:"30px"}}>
  Music
</Box>
            </Grid>
            <Grid item xs={12} my={2} sx={{display:"flex",flexWrap:"wrap"}}>
        
                {RapperInfo.loading?null:RapperInfo.data.raper.raper.map((r)=>
                  <Card key={r.title} sx={{ maxWidth: 250 ,bgcolor:" rgba(255, 255, 255, 0.29)",backdropFilter: "blur(10.7px)",border: "1px solid rgba(255, 255, 255, 0.3)" ,m:1,boxShadow:"0 3px 6px rgba(1,1,1,0.16), 0 3px 6px rgba(0,0,0,0.23)"}}>
                  <CardMedia
                   component="img"
                   alt={r.name}
                   height="250"
                   image={r.coverMusic.url}
                    />
                    <CardContent>
                    <Typography component='h6' fontSize={13}>{r.title}</Typography>
                    
                                     
                    </CardContent>
                    <Grid item xs={12}>
                      <Divider variant="middle" />
                   </Grid>
                    <CardActions sx={{display:"block"}} >
                    <Link to={`/MusicPage/${r.slug}`} style={{color:"white",textDecoration:"none"}}><Button variant="outlined" color='secondary' sx={{width:"100%",fontSize:"10px"}} >PlayMusic & Lyrics</Button></Link> 
                    </CardActions>
                  </Card>
                )}
            </Grid>
            </Grid>
            
        </Container>
    );
};

export default RapperBlog;