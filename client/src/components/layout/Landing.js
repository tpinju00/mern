import React, { Component } from "react";
import styles from "./styles.module.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ProfileFilter from "../../components/profiles/ProfileFilter";
import { getProfiles } from "../../actions/profileActions";

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      level: "",
      subjects: "",
      location: "",
      skipMounting: true
    };

    this.getFilterData = this.getFilterData.bind(this);
  }

  getFilterData(data) {
    //console.log("data", data);
    this.props.getProfiles(data);
  }

  render() {
    //console.log("peskoci", this.state.skipMounting);
    return (
      <div className={styles.landing}>
        {/* <Profiles
                level={this.state.level}
                subjects={this.state.subjects}
                location={this.state.location}
                skipMounting
              /> */}
        <br />
        {/* <Profiles
                skipMounting={this.state.skipMounting}
                sendData={this.getFilterData}
              /> */}
        <ProfileFilter skipMounting />
      </div>
    );
  }
}

Landing.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Landing);
