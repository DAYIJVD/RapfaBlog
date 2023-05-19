import React from "react";
import Layout from "./Layout/Layout";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import MusicPage from "./components/MusicPage";
import MusicInfoPlay from "./shared/MusicInfoPlay";
import RappersPage from "./components/RappersPage";
import RapperBlog from "./shared/RapperBlog";
import ScrollOnTop from "./shared/ScrollOnTop";

function App() {

  return (
    <>
    
    <Layout>
    <ScrollOnTop/>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/MusicPage" element={<MusicPage/>}/>
      <Route path="/Rappers" element={<RappersPage/>}/>
      <Route path="/Rappers/:slug" element={<RapperBlog/>}/>
      <Route path="/MusicPage/:slug" element={<MusicInfoPlay/>}/>
    </Routes>
    </Layout>

   </>
  );
}

export default App;
