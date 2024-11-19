import { Link, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
//import FootballData from "../../type/FootballData"
import './MatchDayCard.scss'
import FixtureData from "../../type/FixtureData";


const MatchDayCardInfo = () => {
  const navigate = useNavigate();

  const[eventData, setEventData] = useState({} as FixtureData)
 
  const { id } = useParams();
  
  useEffect(()=> {
    const key: string = import.meta.env.VITE_API_KEY;

    const accessParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'X-Auth-Token': key
      }
    }
    const eventRequest = fetch(`/api/v4/matches/${id}`, accessParams).then(response => response.json());
  
    Promise.resolve(eventRequest)
    .then(data => setEventData(data))
    .catch((err) => {
      console.log(err);
      navigate("/timeout", {state:{prevURL: window.location.href}});
    })

  }, [id, navigate])

  console.log("particular match info: ", eventData);

  return (
    <section>
      {eventData ?
        <>
          <h1>Home Team Ground</h1>
          <div className="venue-card">
            {/* <h2 className="venue-card__venue-header">{eventData?.competition.name}</h2> */}
            {/* {eventData.strWebsite ?
              <a href={"https://" + eventData.strWebsite} target="_blank">Click here for more info!</a>
              :
              ""
            } 
    
            <img src={eventData.strThumb} alt="stadiumPic" width={"80%"} height={"20%"} />
    
            <p>Location: <span className="venue-card__venue-metadata">{eventData.strLocation}</span></p>
            <p>Capacity: <span className="venue-card__venue-metadata">{eventData.intCapacity}</span></p>
    
            <article className="venue-card__venue-desc">
              <h3>About {eventData.strVenue}</h3>
              <p>{eventData.strDescriptionEN}</p>
            </article>
            */}
          </div> 
        </>
        :
        <div className="venue-card venue-card__venue-no-data">
          <h2>No additional data </h2>
          <Link to={"/"}>Click here to go back</Link>
        </div>
      
      }
       
    </section>
  )
}

export default MatchDayCardInfo