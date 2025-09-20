import { Routes, Route } from "react-router-dom";

import Hero from "./Hero"
import Features from "./Features"
import Integration from "./Integration"
import Security from "./Security"
import Getstarted from "./Getstarted"
import Footer from "./Footer"

export default function Homepage(){

  
  return(
    <div className="min-h-screen">
    <div id="Home" className="h-screen"> 
      <Hero  />
    </div>
    <div id="Features">
      <Features />
    </div>
    <div id="Integrations">
      <Integration />
    </div>
    <div id="Security">
      <Security />
    </div>
    <div id="Getstarted">
      <Getstarted />
    </div>
    <Footer />
    </div>
  )
}