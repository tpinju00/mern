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
        <Link className={styles.NavLink} to="/feed">
          Post Feed
        </Link>

        <Link className={styles.NavLink} to="/dashboard">
          Dashboard
        </Link>

        <a
          href=""
          onClick={this.onLogoutClick.bind(this)}
          className={styles.NavLink}
        >
          <img src={user.picture} style={{ width: "25px" }} />
          {""}
          Logout
        </a>
      </div>
    );

    const guestLinks = (
      <div className={styles.ListGeneral}>
        {" "}
        <Link className={styles.NavLink} to="/register">
          Sign Up
        </Link>
        <Link className={styles.NavLink} to="/login">
          Login
        </Link>
      </div>
    );

    return (
      <nav className={styles.Container}>
        <div className={styles.Container}>
          <Link className={styles.NavLink} to="/">
            DevConnector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className={styles.ListGeneral} id="mobile-nav">
            <Link className={styles.NavLink} to="/profiles">
              {" "}
              Developers
            </Link>

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
