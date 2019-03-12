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
      <div className={styles.landing}>
        <div className>
          <div className>
            <div className>
              <div className={styles.bothLinks}>
                <Link to="/register" className={styles.LinkFrontPage}>
                  Registracija
                </Link>
                <Link to="/login" className={styles.LinkFrontPage}>
                  Prijava
                </Link>
              </div>

              <Profiles status={this.state.status} skipMounting />
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
