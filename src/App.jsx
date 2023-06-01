import React from "react";
import Calendar from "./components/Calendar";
import "./App.css";

import { getData, schData } from "./data/data";
import Schedular from "./components/Schedular";
import { Link, Route, Routes } from "react-router-dom";
import Timeline from "./components/timeline/Timeline";

function App() {
  return (
    <>
      {/* <Calendar events={getData()} date={new Date(2023, 4, 22)} /> */}
      {/* <Schedular events={schData}/> */}
      <nav className="top-navbar">
        <ul>
          <li>
            <Link to="/">Calendar</Link>
          </li>
          <li>
            <Link to="/schedular">Schedular</Link>
          </li>
          <li>
            <Link to="/timeline">Timeline</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <Calendar
              events={getData()}
              date={new Date(2023, 4, 22)}
            />
          }
        />
        <Route
          path="/schedular"
          element={<Schedular events={schData} />}
        />
        <Route
          path="/timeline"
          element={<Timeline />}
        />
      </Routes>
    </>
  );
}

export default App;
