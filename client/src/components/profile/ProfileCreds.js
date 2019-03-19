import React, { Component } from "react";
import Moment from "react-moment";
import styles from "./styles.module.css";

class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props;

    const expItems = experience.map(exp => (
      <li key={exp._id} className>
        <h4>{exp.company}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
          {exp.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </p>
        <p>
          <strong>Position:</strong> {exp.title}
        </p>
        <p>
          {exp.location === "" ? null : (
            <span>
              <strong>Location: </strong> {exp.location}
            </span>
          )}
        </p>
        <p>
          {exp.description === "" ? null : (
            <span>
              <strong>Description: </strong> {exp.description}
            </span>
          )}
        </p>
      </li>
    ));

    const eduItems = education.map(edu => (
      <li key={edu._id} className>
        <h4>{edu.school}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
          {edu.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </p>
        <p>
          <strong>Degree:</strong> {edu.degree}
        </p>
        <p>
          <strong>Field Of Study:</strong> {edu.fieldofstudy}
        </p>
        <p>
          {edu.description === "" ? null : (
            <span>
              <strong>Description: </strong> {edu.description}
            </span>
          )}
        </p>
      </li>
    ));
    return (
      <div className={styles.profile}>
        <div className={styles.profileThird}>
          <div className={styles.sep1}>
            <h3 className={styles.education}>Obrazovanje</h3>
            {eduItems.length > 0 ? (
              <ul className>{eduItems}</ul>
            ) : (
              <p className>Obrazovanje nije navedeno</p>
            )}
          </div>

          <div className={styles.sep2}>
            <h3 className={styles.experience}>Iskustvo</h3>
            {expItems.length > 0 ? (
              <ul className>{expItems}</ul>
            ) : (
              <p className>Iskustvo nije navedeno</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
