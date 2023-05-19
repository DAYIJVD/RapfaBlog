import { useMutation } from '@apollo/client';
import { Navigation, Send } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import React, {   useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { CREATE_COMMENT } from '../graphQL/Mutation';
const validate=(values)=>{
   let errors={}
   if(!values.name){
    errors= {...errors,name:"You did not enter your name"}
   }else if(values.name.length<5){
      errors= {...errors,name:"Your name must be more than 5 characters..!"}
    }
   
    if(!values.email){
        errors= {...errors,email:"You did not enter your email"}
       }else if(!/^([a-zA-Z0-9_]+)@([a-zA-Z0-9_]+)(\.[a-zA-Z]{2,5}){1,2}$/.test(values.email)){
       errors= {...errors,email:"Your email is not valid..!"}
    }
    
    if(!values.comment){
        errors= {...errors,comment:"You did not enter your comment"}
       }else if(values.comment.length<6){
        errors= {...errors,comment:"Your Comment must be more than 6 characters..!"}
    }
    return errors
}
const FormValidation = (props) => {
    const [validation,setValidation]=useState(true)
    const [errorSend]=useState(false)
    const [Touched,setTouched]=useState({
        name:false,
        email:false,
        comment:false
    })
    const [errors,setErorrs]=useState({})
    const [values,setValues]=useState({
        name:"",
        email:"",
        comment:""
    })
    const [SendCommentQL,{loading}]=useMutation(CREATE_COMMENT,{
        variables:{name:values.name,comment:values.comment,email:values.email,slug:props.slug}
    })
    useEffect(()=>{
        if(validation){
            setErorrs(validate(values))
        }else{
            return null
        }
      
    },[values,validation])
    const Onchange=(e)=>{
      setValues({...values,[e.target.name]:e.target.value})
        
       
    }
    const focusHand=(e)=>{
        setTouched({
              ...Touched,[e.target.name]:true
        })
    }
    const sendComment=()=>{
        if(!errors.name&&!errors.email&&!errors.comment){ 
            setValidation(false) 
        SendCommentQL()
            toast.success("Your comment has been sent and is being approved by the admin. Thank you for your comment..!")
           if(!loading) {setValues({
                name:"",
                email:"",
                comment:""
           })
        
        }
        }else{
            toast.error("our comment was not sent. The comment information is not correct")
        }
    }
    return (
        <div style={{padding:"18px",margin:"2px"}}>
            <Box component="span" sx={{py:1,px:2,width:"fit-content",display:"flex",alignItems:"center", backgroundColor:"white",mb:2,borderRadius:"30px"}}>
  <Navigation sx={{ mr: 1 }} />
  Send Comment
</Box>
          <Box 
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 2 },
        display:"flex",
        flexDirection:"column",
        backgroundColor:"rgba(255, 255, 255, 0.29)",borderRadius:"15px"
      }}
      autoComplete="off"
    >
     <TextField

     value={values.name}
     onChange={Onchange}
     onFocusCapture={focusHand}
     color='secondary'
     {...errorSend&& {error:true}}
          label="Name"
          name="name"
          helperText={errors.name&&Touched.name&&errors.name}
        />  
          <TextField
  
     {...errorSend&& {error:true}}
     value={values.email}
     color='secondary'
     onChange={Onchange}
     onFocus={focusHand}
          type='email'
          label="Email"
          name="email"
          helperText={errors.email&&Touched.email&&errors.email}
        /> 
       <TextField
     
     {...errorSend&& {error:true}}
     value={values.comment}
     color='secondary'
     onChange={Onchange}  
     onFocus={focusHand}
        label="Text Comment"
        name="comment"
        helperText={errors.comment&&Touched.comment&&errors.comment}
        multiline
        rows={3}
      />      
       
      <ToastContainer/>
    </Box>  
    <IconButton  sx={{bgcolor:"rgba(255, 255, 255, 0.29)",mt:2,p:2}} onClick={sendComment}>
        <Send fontSize='medium'  color='secondary'/>
      </IconButton>
        </div>
    );
};

export default FormValidation;