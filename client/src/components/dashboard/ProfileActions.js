import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const ProfileActions = () => {
  return (
    <div className={styles.allAct} role="group">
      <Link to="/edit-profile" className={styles.profileAct}>
        <i className="fas fa-user-circle text-info mr-1" />
        Uredite svoj profil
      </Link>
      <Link to="/add-experience" className={styles.profileAct}>
        <i className="fab fa-black-tie text-info mr-1" />
        Dodajte iskustvo
      </Link>
      <Link to="/add-education" className={styles.profileAct}>
        <i className="fas fa-graduation-cap text-info mr-1" />
        Dodajte obrazovanje
      </Link>
    </div>
  );
};

export default ProfileActions;
