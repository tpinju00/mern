import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";
import styles from "./styles.module.css";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    //Get first name
    const firstName = profile.user.name.trim().split(" ")[0];

    // Skill list
    const skills = profile.skills.map((skill, index) => (
      <div key={index} className>
        <i className />
        {skill}
      </div>
    ));
    return (
      <div className={styles.profile}>
        <div className={styles.profileSecond}>
          <h3 className={styles.personBio}>Informacije o korisniku</h3>
          <p>
            {isEmpty(profile.bio) ? (
              <span>{firstName} nema opis.</span>
            ) : (
              <span>{profile.bio}</span>
            )}
          </p>
        </div>
      </div>
    );
  }
}

export default ProfileAbout;
