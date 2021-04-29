import React, { useState, useEffect } from "react";
import { haversine, getLocation } from "./util/geolocation";
// import { neighborhood} from "./util/neighborhood";
import { pines } from "./util/edgewood";
import "./styles/app.scss";

function App() {
  const course = pines;
  const [currentHole, setCurrentHole] = useState(0);
  const [location, setLocation] = useState([]);
  const [yardage, setYardage] = useState([]);

  const navigate = (direction) => {
    if (direction === -1) {
      if (currentHole < 1) {
        setCurrentHole(course.length - 1); // wrap-around
      } else setCurrentHole(currentHole - 1);
    } else {
      if (currentHole === course.length - 1) {
        // wrap-around
        setCurrentHole(0);
      } else setCurrentHole(currentHole + 1);
    }
  };

  const getYardage = () => {
    getLocation(setLocation);
  };

  useEffect(() => {
    let front = haversine(location, course[currentHole].green.front);
    let center = haversine(location, course[currentHole].green.center);
    let back = haversine(location, course[currentHole].green.back);
    setYardage([front, center, back]);
  }, [location, course, currentHole]);

  return (
    <div className="App">
      <div className="course">
        <div className="course-title">
          <h2>Edgewood</h2>
          <h4>Pines - back 9</h4>
        </div>

        <div className="hole">
          <div className="hole-info">
            <p>
              hole: &nbsp;
              <span className="hole-no">{course[currentHole].hole}</span>
            </p>
            <p>par: {course[currentHole].par}</p>
          </div>
          <div className="hole-nav">
            <button onClick={() => navigate(-1)}>previous</button>
            <button onClick={() => navigate(1)}>next</button>
          </div>
        </div>

        <div>
          <button className="yardage-btn" onClick={() => getYardage()}>
            get yardage
          </button>
        </div>

        <div className="shot-info">
          <p>ball: {location}</p>
          <br></br>
          <h4>Green</h4>
          <p>front: {yardage[0]} yards</p>
          <p>center: {yardage[1]} yards</p>
          <p>back: {yardage[2]} yards</p>
        </div>
      </div>
    </div>
  );
}

export default App;
