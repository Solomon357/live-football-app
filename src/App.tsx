//import { useState } from 'react'
import './App.scss';
import Carousel from './components/Carousel/Carousel';


function App() {


  
  return (
    <>
     <h1>Live Football Matches</h1>
     <input type="text" placeholder='search CL teams...' />
     <button>Search</button>

      <Carousel heading="Champions League"/>

      <input type="text" placeholder='search PL teams...' />
      <button>Search</button>
      
      <Carousel heading="Premier League"/>
    </>
  )
}

export default App;






