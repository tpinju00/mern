import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";
import styles from "./styles.module.css";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className="card">
        <div className={styles.Row}>
          <div className="col-2">
            {isEmpty(profile.picture) ? (
              <img
                src={"http://localhost:3000/uploads/1552227868518download.png"}
                alt=""
                className="rounded-circle"
              />
            ) : (
              <img
                src={"http://localhost:3000/uploads/" + profile.picture}
                alt=""
                className="rounded-circle"
              />
            )}
          </div>
          <div className="col-lg-6">
            <h3>{profile.user.name}</h3>

            <p>
              {isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}{" "}
            </p>
            <p>{profile.bio} </p>
            <p>
              {profile.subject} {profile.level}
            </p>
          </div>
          <div className="col-md-4">
            <h4>Cijena i rating</h4>
            <p>{profile.totalRating} </p>
            <p>
              {isEmpty(profile.price) ? null : (
                <span>{profile.price + " Kuna po satu"}</span>
              )}
            </p>

            {/*<ul className="listgroup">
              {profile.skills.slice(0, 4).map((skill, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {skill}
                </li>
              ))}
            </ul> */}

            <Link to={`/profile/${profile.handle}`} className="btn">
              View Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
