//rcc tab kratica
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";
import styles from "./styles.module.css";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <div className={styles.ListGeneral}>
        <Link className={styles.NavLink} to="/profiles">
          {" "}
          Pretraži oglase
        </Link>
        <Link className={styles.NavLink} to="/dashboard">
          Profil
        </Link>

        <button
          onClick={this.onLogoutClick.bind(this)}
          className={styles.NavLink}
        >
          <img src={user.picture} style={{ width: "25px" }} alt="Profile" />
          {""}
          Odjava
        </button>
      </div>
    );

    const guestLinks = (
      <div className={styles.ListGeneral}>
        {" "}
        <Link className={styles.NavLink} to="/profiles">
          {" "}
          Pretraži oglase
        </Link>
        <Link className={styles.NavLink} to="/register">
          Registracija
        </Link>
        <Link className={styles.NavLink} to="/login">
          Prijava
        </Link>
      </div>
    );

    return (
      <nav className={styles.Container}>
        <div className={styles.Container}>
          <Link className={styles.NavLink} to="/">
            LOGO
          </Link>

          <div className={styles.ListGeneral}>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, clearCurrentProfile }
)(Navbar);
