import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_RAPPERS_PAGE } from '../graphQL/Query';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, CircularProgress, Container, Grid, IconButton, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowBack, MusicNote } from '@mui/icons-material';

const RappersPage = () => {
  const back=useNavigate()
    const RappersPage=useQuery(GET_RAPPERS_PAGE)
    return (
        <Container maxWidth="xl">
           <Grid container>
            <Grid item xs={12} my={3}>
            <Box sx={{display:"flex",justifyContent:"space-between",mt:2}}>
                    <IconButton onClick={()=>back(-1)}><ArrowBack sx={{fontsize:"60px"}}/></IconButton>
                    <IconButton disabled><MusicNote sx={{fontsize:"60px"}} /></IconButton>
                  </Box>
             {RappersPage.loading?
            <Box sx={{display:"flex",minHeight:"100vh",justifyContent:"center",alignItems:"center"}}>
            <CircularProgress color='secondary'/>
            </Box> 
            :
            <Box sx={{display:"flex",flexWrap:"wrap",minHeight:"100vh",justifyContent:"center",alignItems:"center"}}>
           { RappersPage.data.rapers.map((r)=>
            <Card sx={{bgcolor:" rgba(255, 255, 255, 0.29)",backdropFilter: "blur(10.7px)",border: "1px solid rgba(255, 255, 255, 0.3)" ,m:1,boxShadow:"0 3px 6px rgba(1,1,1,0.16), 0 3px 6px rgba(0,0,0,0.23)", maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={r.avatar.url}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {r.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {r.descriptionText.substring(0,120)}...
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
       <Link to={`/Rappers/${r.slug}`}> <Button size="small"  color="secondary">
          More
        </Button></Link>
      </CardActions>
    </Card>
            )}
             </Box>}
            </Grid>
           </Grid>
        </Container>
    );
};

export default RappersPage;