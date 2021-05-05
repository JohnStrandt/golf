import React, { useState, useEffect } from "react";
import { haversine, getLocation } from "./util/geolocation";
import { rivermoor } from "./courses/rivermoor";
import "./styles/app.scss";

function App() {
  const course = rivermoor;
  console.log(course);
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
    let dogleg;
    if (course[currentHole].dogleg) {
      dogleg = haversine(location, course[currentHole].dogleg);
    }
    console.log(dogleg);
    let front = haversine(location, course[currentHole].green.front);
    let center = haversine(location, course[currentHole].green.center);
    let back = haversine(location, course[currentHole].green.back);
    setYardage([dogleg, front, center, back]);
  }, [location, course, currentHole]);

  return (
    <div className="App">
      <div className="course">
        <div className="course-title">
          <h2>Rivermoor</h2>
          <h4>front 9</h4>
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
          <p>ball: {location[0]}, {location[1]}</p>
          <br />
          {yardage[0] && <h5>Dogleg: {yardage[0]} yards</h5>}
          <br />
          <h4>Green</h4>
          <p>front: {yardage[1]} yards</p>
          <p>center: {yardage[2]} yards</p>
          <p>back: {yardage[3]} yards</p>
        </div>
      </div>
    </div>
  );
}

export default App;
