import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import VenueData from "../../type/VenueData"
//import FootballData from "../../type/FootballData"
import './MatchDayCard.scss'


const MatchDayCardInfo = () => {
  const[venueData, setVenueData] = useState({} as VenueData)
  //const[eventData, setEventData] = useState({} as FootballData)
  const { id } = useParams();
  
  useEffect(()=> {
    const venueRequest = fetch(`https://www.thesportsdb.com/api/v1/json/3/lookupvenue.php?id=${id}`).then(response => response.json());
  
    Promise.resolve(venueRequest)
    .then(data => setVenueData(data.venues[0]))
    .catch((err) => console.log(err))

  }, [id])
  console.log("heres some venueData",venueData)

  return (
    <section>
      <h1>Home Team Ground</h1>
      <div className="venue-card">
        <h2 className="venue-card__venue-header">{venueData.strVenue}</h2>
        <a href={"https://" + venueData.strWebsite} target="_blank">Click here for more info!</a>
        <img src={venueData.strThumb} alt="stadiumPic" width={"80%"} height={"20%"} />
        <p>Location: <span className="venue-card__venue-metadata">{venueData.strLocation}</span></p>
        <p>Capacity: <span className="venue-card__venue-metadata">{venueData.intCapacity}</span></p>
        <article className="venue-desc">
          <h3>About {venueData.strVenue}</h3>
          <p>{venueData.strDescriptionEN}</p>
        </article>

      </div> 
    </section>
  )
}

export default MatchDayCardInfo