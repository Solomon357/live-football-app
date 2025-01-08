import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import './MatchDayCardInfo.scss'
import FixtureData from "../../type/FixtureData";


const MatchDayCardInfo = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const[eventData, setEventData] = useState({} as FixtureData)
  const[head2headData, setHead2headData] = useState([] as FixtureData[])
 
  const { id } = useParams();
  
  useEffect(()=> {
    
    //error handling for location state
    if(location.state.errorCode){
      navigate("/timeout", {state:{prevURL: window.location.href}});
    }

    setEventData(location.state);

    fetch(`https://live-football-express.netlify.app/api/${id}/head2head`)
      .then(res => res.json())
      .then(data => setHead2headData(data.matches))
      .catch(err => {
        console.log(err);
        navigate("/timeout", {state:{prevURL: window.location.href}});
      })
   
  }, [id, navigate, location.state])

  const matchDate = new Date(eventData.utcDate).toUTCString().slice(0,17);
  const currentDate = new Date().toISOString(); 
  
  //console.log(head2headData); //test
  //console.log("data passed as state", location.state) //test
  //console.log("particular match info: ", eventData); //test

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
                  <span>{eventData.score.fullTime.home ?? "N" }<span style={{color:"orange"}}> | </span>{eventData.score.fullTime.away ?? "A"}</span>
                </div>
                
                <div className="info-header-container__header">
                  <img className="team-badge" src={eventData.awayTeam.crest} alt="awayBadge" height={'40px'} width={'40px'} />
                  <span>{eventData.awayTeam.name}</span>
                </div>
              </header>
              <h2>FT</h2>
              <h3> HT {eventData.score.halfTime.home ?? "N" } - {eventData.score.halfTime.away ?? "A"}</h3>

              <section className="referee-info-container">
                <p><span>Referee: </span>{eventData.referees.length ? eventData.referees[0].name : "N/A"}</p>
                <p><span>Nationality: </span>{eventData.referees.length ? eventData.referees[0].nationality : "N/A"}</p>
              </section> 

              <section className="head2head">
                <h2 className="head2head-title">Previous Match Results</h2>
                {head2headData.map((match, i) => {
                  if(i !== 0){
                   // console.log(match.utcDate)
                   // console.log(matchDate)
                    const head2headDate = new Date(match.utcDate).toUTCString().slice(0,17);
                    return(
                      <header className="head2head-card" key={match.id}>
                        <div className="head2head-card__container">
                          <div className='head2head-card__teams'>
                            <img className="team-badge" src={match.homeTeam.crest} alt="homeBadge" height={'40px'} width={'40px'} />
                            <span>{match.homeTeam.name}</span>
                          </div>

                          <div className="head2head-card__score-card">
                            <span>{match.score.fullTime.home} - {match.score.fullTime.away}</span>
                            <p className="head2head-card__score-card--date">{head2headDate}</p>
                          </div>

                          <div className='head2head-card__teams'>
                            <span>{match.awayTeam.name}</span>
                            <img className="team-badge" src={match.awayTeam.crest} alt="homeBadge" height={'40px'} width={'40px'} />
                          </div>
                        </div>
                      </header>
                    
                    )
                  }
                })
                }
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
                  <span>{eventData.score.fullTime.home ?? "N" }<span style={{color:"orange"}}> | </span>{eventData.score.fullTime.away ?? "A"}</span>
                </div>
                
                <div className="info-header-container__header">
                  <img className="team-badge" src={eventData.awayTeam.crest} alt="awayBadge" height={'40px'} width={'40px'} />
                  <span>{eventData.awayTeam.name}</span>
                </div>
              </header>

              <h3>This match is scheduled to be played {matchDate} at <span style={{textDecoration:"underline"}}>{eventData.utcDate.slice(11,16)}</span></h3> 

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