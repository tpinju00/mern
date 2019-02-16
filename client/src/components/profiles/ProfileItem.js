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
            <img
              src="{profile.user.picture}"
              alt=""
              className="rounded-circle"
            />
          </div>
          <div className="col-lg-6">
            <h3>{profile.user.name}</h3>
            <p>
              {profile.status}{" "}
              {isEmpty(profile.company) ? null : (
                <span>at {profile.company}</span>
              )}
            </p>
            <p>
              {isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}{" "}
            </p>
            <Link to={`/profile/${profile.handle}`} className="btn">
              View Profile
            </Link>
          </div>
          <div className="col-md-4">
            <h4>Skill set</h4>
            <ul className="listgroup">
              {profile.skills.slice(0, 4).map((skill, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {skill}
                </li>
              ))}
            </ul>
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
