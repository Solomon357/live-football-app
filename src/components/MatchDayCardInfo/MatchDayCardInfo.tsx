import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
//import FootballData from "../../type/FootballData"
import './MatchDayCardInfo.scss'
import FixtureData from "../../type/FixtureData";


const MatchDayCardInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const[eventData, setEventData] = useState({} as FixtureData)
 
  const { id } = useParams();
  
  useEffect(()=> {
    // const key: string = import.meta.env.VITE_API_KEY;

    // const accessParams = {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     'X-Auth-Token': key
    //   }
    // }
    // const eventRequest = fetch(`/api/v4/matches/${id}`, accessParams).then(response => response.json());
  
    // Promise.resolve(eventRequest)
    // .then(data => setEventData(data))
    // .catch((err) => {
    //   console.log(err);
    //   navigate("/timeout", {state:{prevURL: window.location.href}});
    // })

    // potential error handling for location state
    if(location.state.errorCode){
      navigate("/timeout", {state:{prevURL: window.location.href}});
    }

    setEventData(location.state);

  }, [id, navigate, location.state])


  const matchDate = new Date(eventData.utcDate).toUTCString().slice(0,17);
  const currentDate = new Date().toISOString(); 
  console.log("data passed as state", location.state)
  console.log("particular match info: ", eventData);

  return (
    <section>
      {Object.keys(eventData).length ? 
        <>
          {
            new Date(eventData.utcDate).getTime() <= new Date(currentDate).getTime() ?
            <>
              <h3>{matchDate} &bull; <span style={{color:"white"}}>{eventData.competition.name}</span></h3>
              <header className="info-header-container">
                <div className="info-header-container__header" style={{justifyContent: "end"}}>
                  <span>{eventData.homeTeam.name}</span>
                  <img className="team-badge" src={eventData.homeTeam.crest} alt="homeBadge" height={'40px'} width={'40px'} />
                </div>

                <div className="info-header-container__fulltime-score">
                  <span>{eventData.score.fullTime.home !== null ? eventData.score.fullTime.home : "N" }<span style={{color:"orange"}}> | </span>{eventData.score.fullTime.away !== null ? eventData.score.fullTime.away : "A"}</span>
                </div>
                
                <div className="info-header-container__header">
                  <img className="team-badge" src={eventData.awayTeam.crest} alt="awayBadge" height={'40px'} width={'40px'} />
                  <span>{eventData.awayTeam.name}</span>
                </div>
              </header>
              <h2>FT</h2>
              <h3> HT {eventData.score.halfTime.home !== null ? eventData.score.halfTime.home : "N" } - {eventData.score.halfTime.away !== null ? eventData.score.halfTime.away : "A"}</h3>
              <section className="venue-card">
                <p><span>Referee: </span>{eventData.referees.length ? eventData.referees[0].name : "N/A"}, {eventData.referees.length ? eventData.referees[0].nationality : "N/A"}</p>
              </section> 
            </> 
            :
            <>
              <h3>{matchDate} &bull; <span style={{color:"white"}}>{eventData.competition.name}</span></h3>
              <header className="info-header-container">
                <div className="info-header-container__header" style={{justifyContent: "end"}}>
                  <span>{eventData.homeTeam.name}</span>
                  <img className="team-badge" src={eventData.homeTeam.crest} alt="homeBadge" height={'40px'} width={'40px'} />
                </div>

                <div className="info-header-container__fulltime-score">
                  <span>{eventData.score.fullTime.home !== null ? eventData.score.fullTime.home : "N" }<span style={{color:"orange"}}> | </span>{eventData.score.fullTime.away !== null ? eventData.score.fullTime.away : "A"}</span>
                </div>
                
                <div className="info-header-container__header">
                  <img className="team-badge" src={eventData.awayTeam.crest} alt="awayBadge" height={'40px'} width={'40px'} />
                  <span>{eventData.awayTeam.name}</span>
                </div>
              </header>

              <h3>Scheduled to be played {matchDate} at {eventData.utcDate.slice(11,16)}</h3> 

              <Link className="navigate" to={'..'} onClick={() => navigate(-1)}>Go Back</Link>
            </>
          }
        </>
        :
        <h1>Loading...</h1>
      }   
    </section>
  )
}

export default MatchDayCardInfo