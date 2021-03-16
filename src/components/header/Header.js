import React from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
//import { CartIcon, Logout } from "../../icons";

const Header = ({ itemCount, isUserLoggedIn, logout, searchItem }) => {
  return (
    <header className={styles.flex}>
      <div>
        <div>
          <h1>EVENTFULL-APP</h1>
        </div>
      </div>

      {/* <div className={styles.seachtext}>
        <input
          type="text"
          style={{
            width: "100%",
            height: "30px",
          }}
          onChange={searchItem}
          placeholder="Search events"
        />
      </div> */}

      
    </header>
  );
};

export default Header;
