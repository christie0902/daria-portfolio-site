import { useState } from 'react'
import './App.scss'
import Hero from './components/hero/Hero'
import FeaturedProduct from './components/featured/FeaturedProduct'
import Gallery from './components/gallery/Gallery'
import Contact from './components/contact/Contact'
import About from './components/about/About'

function App() {
 
  return (
    <>
    <section id="Home">
      <Hero/>
    </section>
    
    <section id="About">
       <About/>
    </section>

   <section id="Featured">
      <FeaturedProduct/>
    </section>
    <section id="Gallery">
       <Gallery/>
    </section>

    
    <section id="Contact">
       <Contact/>
    </section>

    </>
  )
}

export default App
