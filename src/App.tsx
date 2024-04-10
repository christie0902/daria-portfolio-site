import { useState } from 'react'
import './App.css'
import Hero from './components/hero/Hero'
import FeaturedProduct from './components/featured/FeaturedProduct'
import Gallery from './components/gallery/Gallery'
import Contact from './components/contact/Contact'

function App() {
 
  return (
    <>
     <Hero/>
     <FeaturedProduct/>
     <Gallery/>
     <Contact/>
    </>
  )
}

export default App
