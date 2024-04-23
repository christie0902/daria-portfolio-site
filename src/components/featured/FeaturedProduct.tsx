import React, { useState } from 'react'
import Book from './Book'
import "./featured.scss"

const FeaturedProduct = () => {


  return (
    <>
    <h1 className='section-title'>FEATURED ARTS</h1>
    <div className='feature-container'>
       <Book/>
    </div>
    </>
  )
}

export default FeaturedProduct