import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Frontend from "./pages/Frontend";
import Backend from "./pages/Backend";

const App = () => {
  return (
    <Router>
      <div className="container">
        <header className="d-flex justify-content-center py-3">
          <ul className="nav nav-pills">
            <li className="nav-item">
              <NavLink to="/frontend" className="nav-link">
                Frontend
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/backend" className="nav-link">
                Backend
              </NavLink>
            </li>
          </ul>
        </header>
      </div>

      <div className="album py-5 bg-light">
        <div className="container">
          <Routes>
            <Route path="/frontend" element={<Frontend />} />
            <Route path="/backend" element={<Backend />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
