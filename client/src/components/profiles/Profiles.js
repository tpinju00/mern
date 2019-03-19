import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfiles } from "../../actions/profileActions";
import ProfileItem from "./ProfileItem";
import ProfileFilter from "./ProfileFilter";
import {
  getProfileByStatus,
  getProfileByLevel
} from "../../actions/profileActions";
import SelectListGroup from "../common/SelectListGroup";
import isEmpty from "../../validation/is-empty";
import { withRouter } from "react-router-dom";
import styles from "./styles.module.css";

class Profiles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      level: "",
      subjects: "",
      location: "",
      filterParams: [],
      errors: {}
    };

    this.getFilterData = this.getFilterData.bind(this);
  }

  componentDidMount() {
    if (this.props.history.state) {
      console.log("filters iz stanja", this.props.location.state.filters);
      this.props.getProfiles(this.props.location.state.filters);
    } else {
      this.props.getProfiles();
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log("prev props", prevProps);
  //   console.log("prev state", prevState);
  //   //this.props.getProfiles(this.props.history.location.state.filters);
  // }

  // componentWillMount() {
  //   this.props.getProfiles();
  // }

  getFilterData(filterParams) {
    console.log("filterParams", filterParams);
    this.props.getProfiles(filterParams);
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    let newSkipMounting = 1;
    console.log("props being called", this.props);
    if (this.props.skipMounting) {
      newSkipMounting = 0;
    }

    //console.log("PRESKOCI2", newSkipMounting);

    //console.log(profiles);

    if (isEmpty(profiles) || loading) {
      //profileStatusItems = <Spinner />;
    } else {
      //console.log("filter", this.props.skipMounting);
      if (isEmpty(profiles) || this.props.skipMounting) {
        profileItems = <h1>No profiles</h1>;
      } else {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <ProfileFilter newSkipMounting sendData={this.getFilterData} />
          {this.props.history.location.pathname === "/profiles" && profileItems}
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  getProfileByStatus: PropTypes.func.isRequired,
  getProfileByLevel: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles, getProfileByStatus, getProfileByLevel }
)(withRouter(Profiles));
