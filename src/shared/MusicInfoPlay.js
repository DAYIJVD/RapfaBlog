import { useQuery } from '@apollo/client';
import React, { useEffect,useState } from 'react';
import { GET_AVATARS_RAPPERS, GET_CAMMENTS, GET_MUSIC_PLAY } from '../graphQL/Query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Avatar, Box, CardMedia, CircularProgress, Container, Divider, Grid, IconButton, LinearProgress, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import {ArrowBack, ArrowCircleLeft,ArrowCircleRight, MusicNote, PauseCircle,PlayCircle} from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import FormValidation from './FormValidation';

function stringToColor(string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

const MusicInfoPlay = () => {
  const [Hide,setHide]=useState(true)
  const [LyTranslated,setLyTranslated]=useState(false)
  const back=useNavigate()
    const musicAudio=document.querySelector("audio")
    const [urlMusic,SetUrl]=useState("")
    const [play,setplay]=useState(true)
    const RappersAvatars=useQuery(GET_AVATARS_RAPPERS); 
    const {slug}=useParams()
    const MusicInfo=useQuery(GET_MUSIC_PLAY,{
        variables:{slug:slug}
    })
    const Comments=useQuery(GET_CAMMENTS,{
      variables:{slug:slug}
    })
    const [alignment, setAlignment] = React.useState('Hide');

    const handleChange = (e, newAlignment) => {
      if (newAlignment !== null) {
        setAlignment(newAlignment); 
        if(newAlignment==="Translate Lyrics"){
          setLyTranslated(true)
          setHide(false)
          toast("This lyric was translated with the help of Google Translate and it may not be translated correctly, so we apologize!")
        }else if(newAlignment==="Hide"){
          setHide(true)
        }else if(newAlignment==="Lyrics"){
          setLyTranslated(false)
          setHide(false)
         }
      }
      
    };
  useEffect(()=>{
    

    if(!!MusicInfo.data){
        SetUrl(MusicInfo.data.music.audioMusic.url)
        toast("Wait for the music to play! Music is uploading...")
        
    }
   
  },[MusicInfo])
const playMusic=()=>{
    setplay(!play)
    if(!play){
        musicAudio.pause()
    }
    if(play){
        musicAudio.play()
    }
}
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
             {RappersAvatars.data.rapers.map((rapper,i)=><div key={rapper.name}>
                    <Box  sx={{display:"flex",alignItems:"center",m:1,p:1}}>
                       <Link to={`/Rappers/${rapper.slug}`}> <Avatar src={rapper.avatar.url}/></Link>
                       <Link to={`/Rappers/${rapper.slug}`} style={{color:"white",textDecoration:"none"}}>   <Typography variant='h6' component="span" ml={2} color="secondary">{rapper.name}</Typography></Link>
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
                <Grid item xs={12} md={9} mt={1} sx={{minHeight:"100vh"}}>
                  <Box sx={{display:"flex",justifyContent:"space-between"}}>
                    <IconButton onClick={()=>back(-1)}><ArrowBack sx={{fontsize:"60px"}}/></IconButton>
                    <IconButton disabled><MusicNote sx={{fontsize:"60px"}} /></IconButton>
                  </Box>
                {MusicInfo.loading?
                  <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",minHeight:"100vh"}}>
                  <CircularProgress color='secondary' />
                   </Box>
                :
                <Grid item xs={12} sx={{display:"flex",flexDirection:"column",alignItems:"center",minHeight:"100vh",mt:2}}>
                  <CardMedia
                  sx={{my:2,borderRadius:"15px"}}
          component="img"
          height="350"
          image={MusicInfo.data.music.coverMusic.url}
          alt="green iguana"
        />
                  <Typography variant='h6' color="secondary">{MusicInfo.data.music.name}</Typography>
                  <Box component="audio" src={urlMusic} loop></Box>
                  <Typography variant='h6' color="secondary">{MusicInfo.data.music.title}</Typography>
                  <Box sx={{display:"flex",mt:1}}>
                    <IconButton disabled><ArrowCircleLeft sx={{fontSize:"60px"}}/> </IconButton>
                    <IconButton onClick={playMusic}>{!play?<PauseCircle sx={{fontSize:"100px"}}/>:<PlayCircle sx={{fontSize:"100px"}}/>}</IconButton>
                    <IconButton disabled> <ArrowCircleRight  sx={{fontSize:"60px"}}/> </IconButton>
                  
                   

                  </Box>
                  <ToggleButtonGroup
                  sx={{mt:2}}
      color="secondary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="Lyrics">Lyric</ToggleButton>
      <ToggleButton value="Hide">Hide</ToggleButton>
      <ToggleButton value="Translate Lyrics">Translate-Lyric</ToggleButton>
    </ToggleButtonGroup>
    {Hide?null: <div style={{padding:2,color:"white",textAlign:"center"}}  dangerouslySetInnerHTML={{__html:LyTranslated?MusicInfo.data.music.musicTextTranslate.html:MusicInfo.data.music.musicText.html}} >
     </div>}
    
                </Grid>
                }
                </Grid>
                <Grid item xs={12}>
                      <Divider variant="middle" />
                   </Grid>
                <Grid item xs={12} md={4}>
                {!MusicInfo.loading&& <FormValidation slug={slug}/>} 
                </Grid>
                <Grid item xs={12} md={8}>
                  <Grid item m={2}>
                  <Box component="span" sx={{py:1,px:2,width:"fit-content",display:"flex",alignItems:"center", backgroundColor:"white",mb:2,borderRadius:"30px"}}>
                  Comments
                 </Box>
                  </Grid>
                  <Grid item xs={12} sx={{display:"flex",flexWrap:"wrap"}}>
                    {!Comments.loading&&Comments.data.comments.length===0&&<Typography color="secondary" sx={{ml:2,my:2}} variant='h6'>There are no comments for this music</Typography>}
                  {!Comments.loading&&Comments.data.comments.map((c)=>
                    <Grid xs={12} md={5}item key={c.email} sx={{p:2,m:2,bgcolor:"rgba(255, 255, 255, 0.29)",borderRadius:"15px",color:"white"}}>
                      <Box sx={{display:"flex",alignItems:"center"}}>
                      <Avatar sx={{bgcolor:stringToColor(c.name),mr:2}} >{c.name.substring(0,1)}</Avatar>
                      <Typography variant='p'>{c.name.toUpperCase()}</Typography>
                      </Box>
                    <Typography sx={{fontSize:"13px"}} variant='p' ml={6}>{c.comment}</Typography>
                    </Grid>
                  )}
                  </Grid>
                </Grid>
 
            </Grid>
            <ToastContainer/>
        </Container>
    );
};

export default MusicInfoPlay;
