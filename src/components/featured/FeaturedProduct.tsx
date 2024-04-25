import React, { useState } from 'react'
import Book from './Book'
import "./featured.scss"

const FeaturedProduct = () => {


  return (
    <>
    <h1 className='section-title'>FEATURED ART</h1>
    <div className="guide">
      <p className='guide-text'>Flip to explore!</p>
      <img className="guide-img" src="arrow.png" alt="arrow" />
    </div>
    <div className='feature-container'>
       <Book/>
    </div>
    </>
  )
}

export default FeaturedProduct