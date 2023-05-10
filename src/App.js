import React from 'react';
import './style.css';
import MapComponent from './MapComponent';
import { BrowserRouter as Router, Route, Routes, useParams} from 'react-router-dom'


export default function App() {
  return (
    <div>
      <Router>
        {/* <ul>
          <li>
            <Link to="/showCollisionBoxes">ShowCollisionBoxes</Link>
          </li>
        </ul> */}
          <Routes>
              <Route path="/" element={<MapComponent />}></Route>
              {/* <Route path="showCollisionBoxes" element={<Map showCollisionBoxes={true}/>}></Route> */}
              <Route path=":z1/:lat1/:lng1" element={<MapComponent/>}></Route>
          </Routes>
      </Router>
    </div>
  );
}
