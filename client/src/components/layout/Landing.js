import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Profiles from "../../components/profiles/Profiles";

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: ""
    };
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Developer Connector</h1>
                <p className="lead">
                  {" "}
                  Create a developer profile/portfolio, share posts and get help
                  from other developers
                </p>
                <hr />
                <Link to="/register" className={styles.NavLink}>
                  Sign Up
                </Link>
                <Link to="/login" className={styles.NavLink}>
                  Login
                </Link>
                <Profiles status={this.state.status} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(Landing);
