import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
const client=new ApolloClient({
  uri:process.env.REACT_APP_URI,
  cache:new InMemoryCache()
})


const darkTheme = createTheme({
  palette: {
    mode:"dark",
    primary: {
      main: '#121212',
    },
    secondary: {
      main: '#fff',
    },
  },
  typography: {
    fontFamily: [
      "yekan",
      "Roboto",
      'Segoe UI',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

 <ApolloProvider client={client}>
  <BrowserRouter>
  <ThemeProvider theme={darkTheme}>
<App />
  </ThemeProvider>
  </BrowserRouter>
 </ApolloProvider> 
  

);

