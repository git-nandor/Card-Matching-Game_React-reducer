import React from "react";
import Logo from "../images/games-logo.png";

const Header = (props) => {
  return (
    <>
      <div className="header">
        <div className="logo-container">
          <img className="logo" src={Logo} alt="logo" />
        </div>
        {props.children}
      </div>
    </>
  );
};
export default Header;
