import { useState, useEffect } from 'react'
import './App.scss';
import Carousel from './components/Carousel/Carousel';

function App() {
  const [mockChampData, setMockChampData] = useState<number[][]>([]);
  const [mockPremData, setMockPremData] = useState<number[][]>([]);

  useEffect(()=> {
    setMockChampData([[0,1,2,3,4,5,6,7,8], [0,1,2,3,4,5,6,7,8], [0,1,2,3,4,5,6,7,8]]);
    setMockPremData([[10,11,12,13,14,15,16,17,18], [10,11,12,13,14,15,16,17,18], [10,11,12,13,14,15,16,17,18]]);
  }, [])


  return (
    <>
     <h1>Live Football Matches</h1>
     <input type="text" placeholder='search CL teams...' />
     <button>Search</button>

      <Carousel heading="Champions League" data={mockChampData}/>

      <input type="text" placeholder='search PL teams...' />
      <button>Search</button>
      
      <Carousel heading="Premier League" data={mockPremData}/>
    </>
  )
}

export default App;






