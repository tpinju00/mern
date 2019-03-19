import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";
import styles from "./styles.module.css";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    return (
      <div className={styles.profile}>
        <div className={styles.profileFirst}>
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
            <h1 className={styles.personUserName}>{profile.user.name}</h1>
            <p>
              {isEmpty(profile.location) ? null : (
                <span>{profile.location}</span>
              )}{" "}
            </p>

            <p>
              {profile.subject} {profile.level}
            </p>
            <h3>OCJENA</h3>
          </div>

          <div className={styles.separator3}>
            <p>
              {isEmpty(profile.price) ? null : (
                <span>{profile.price + " Kuna po satu"}</span>
              )}
            </p>
            <h3>DRUŠTVENE MREŽE</h3>
            {isEmpty(profile.social && profile.social.twitter) ? null : (
              <a className href={profile.social.twitter} target="_blank">
                <i className />
              </a>
            )}

            {isEmpty(profile.social && profile.social.facebook) ? null : (
              <a className href={profile.social.facebook} target="_blank">
                <i className />
              </a>
            )}

            {isEmpty(profile.social && profile.social.linkedin) ? null : (
              <a className href={profile.social.linkedin} target="_blank">
                <i className />
              </a>
            )}

            {isEmpty(profile.social && profile.social.youtube) ? null : (
              <a className href={profile.social.youtube} target="_blank">
                <i className />
              </a>
            )}

            {isEmpty(profile.social && profile.social.instagram) ? null : (
              <a className href={profile.social.instagram} target="_blank">
                <i className />
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
