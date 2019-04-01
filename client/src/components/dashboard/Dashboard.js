import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import ProfileActions from "../dashboard/ProfileActions";
import Experience from "./Experience";
import Education from "./Education";
import styles from "./styles.module.css";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashobardContent;

    if (profile === null || loading === true) {
      dashobardContent = <Spinner />;
    } else {
      //Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashobardContent = (
          <div>
            <p className={styles.belowText}>
              Dobrodošao/la{" "}
              <Link
                to={`/profile/${profile.handle}`}
                className={styles.userName}
              >
                {" "}
                {user.name}
              </Link>
            </p>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div style={{ marginBottom: "60px" }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className={styles.deleteButton}
            >
              Izbriši moj račun
            </button>
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashobardContent = (
          <div>
            <p className={styles.belowText}>Dobrodošao/la {user.name}</p>
            <p className={styles.belowText}> Još niste napravili vaš profil.</p>
            <Link to="/create-profile" className={styles.makeButton}>
              Napravi profil
            </Link>
          </div>
        );
      }
    }
    return (
      <div className>
        <div className>
          <div className>
            <div className>
              <h1 className={styles.title}>Profil</h1>
              {dashobardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
