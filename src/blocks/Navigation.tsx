/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NavLink } from "react-router-dom";
import Logo from "/listapp-logo.svg";

import "../App.scss";

const Navigation = () => {
  return (
    <nav>
      <div className="wrapper">
        <div className="navigation">
          <div>
            <NavLink to="/" className="home-link">
              <img src={Logo} alt="Logo" />
            </NavLink>
          </div>
          <div>{/* <NavLink to="/find">Find list</NavLink> */}</div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
