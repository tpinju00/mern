import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";
import styles from "./styles.module.css";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className={styles.personCard}>
        <div className={styles.insideCard}>
          <div className={styles.separator1}>
            {isEmpty(profile.picture) ? (
              <img
                src={"http://localhost:3000/uploads/1552227868518download.png"}
                alt=""
                className={styles.profilePicture}
              />
            ) : (
              <img
                src={"http://localhost:3000/uploads/" + profile.picture}
                alt=""
                className={styles.profilePicture}
              />
            )}
          </div>

          <div className={styles.separator2}>
            <h3>{profile.user.name}</h3>
            <p>
              {isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}{" "}
            </p>

            <p>
              {profile.subject} {profile.level}
            </p>
          </div>

          <div className={styles.separator3}>
            <h4>Cijena i rating</h4>
            <p>{profile.totalRating} </p>
            <p>
              {isEmpty(profile.price) ? null : (
                <span>{profile.price + " Kuna po satu"}</span>
              )}
            </p>
            <div className={styles.rate}>
              <input type="radio" id="star5" name="rate" value="5" />
              <label for="star5" title="text">
                5 stars
              </label>
              <input type="radio" id="star4" name="rate" value="4" />
              <label for="star4" title="text">
                4 stars
              </label>
              <input type="radio" id="star3" name="rate" value="3" />
              <label for="star3" title="text">
                3 stars
              </label>
              <input type="radio" id="star2" name="rate" value="2" />
              <label for="star2" title="text">
                2 stars
              </label>
              <input type="radio" id="star1" name="rate" value="1" />
              <label for="star1" title="text">
                1 star
              </label>
            </div>
            <Link to={`/profile/${profile.handle}`} className="btn">
              Pogledaj profil
            </Link>
            {/*<ul className="listgroup">
              {profile.skills.slice(0, 4).map((skill, index) => (
                <li key={index} className="list-group-item">
                  <i className="fa fa-check pr-1" />
                  {skill}
                </li>
              ))}
            </ul> */}
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
