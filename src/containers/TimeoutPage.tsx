import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import '../App.scss';
const TimeoutPage = () => {
  const [seconds, setSeconds] = useState<number>(60);
  const location = useLocation();


  useEffect(() => {

    if (seconds <= 0) {
      return;
    }
    const timer = setInterval(() => {
      setSeconds(seconds -1);
    }, 1000);

    return () => clearInterval(timer);

  }, [seconds]);

  return (

    <div>
      {seconds ?
      <>
        <h1>Timeout Page</h1>
        <p className="timeout-para"> 
          Due to API limitations this website is limited to a certain amount of calls per minute.
        </p>

        <p className="timeout-para"> 
          Please wait until the timer below is finished before clicking the link. Thank you for being patient😊
        </p>

        <p className="timer">{seconds}</p>

        <p className="timeout-disabled" >Go Back</p>
      </>
      :
      <>
        <h1>Timeout Page</h1>

        <p className="timeout-para"> 
          Due to API limitations this website is limited to a certain amount of calls per minute.
        </p>

        <p className="timeout-para"> 
          Click below to get back to checking football statistics!
        </p>

        <Link to={location.state.prevURL} className="navigate">Go Back</Link>
      </>
      }
    </div>
  )
}

export default TimeoutPage;