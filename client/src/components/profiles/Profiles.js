import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getProfiles } from "../../actions/profileActions";
import ProfileItem from "./ProfileItem";
import {
  getProfileByStatus,
  getProfileByLevel
} from "../../actions/profileActions";
import SelectListGroup from "../common/SelectListGroup";
import isEmpty from "../../validation/is-empty";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import styles from "./styles.module.css";

class Profiles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      level: "",
      subject: "",
      location: "",
      filteredByStatus: [],
      filteredByLevel: [],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (!this.props.skipMounting) {
      // //Test
      // const values = queryString.parse(this.props.location.search);
      // console.log(values.status);
      // // ENd test
      /*if (!this.props.history.location.state.redirect == "submit") {
        this.props.getProfiles();
      }*/
      this.props.getProfiles();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      this.setState({ filteredByStatus: nextProps.profile.profile });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const filters = {};

    if (this.state.location !== "") {
      filters.location = this.state.location;
    }

    if (this.state.subject !== "") {
      filters.subject = this.state.subject;
    }
    if (this.state.level !== "") {
      filters.level = this.state.level;
    }

    this.props.getProfiles(filters);

    //redirect to /profiles
    this.props.history.push("/profiles", { redirect: "submit" });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    const { errors } = this.state;
    const { filteredByStatus, filteredByLevel } = this.state;
    let profileStatusItems;
    let profileLevelItems;

    console.log(profiles);

    if (isEmpty(profiles) || loading) {
      //profileStatusItems = <Spinner />;
    } else {
      if (!isEmpty(profiles) && isEmpty(filteredByStatus || filteredByLevel)) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else if (filteredByStatus.length > 0 || filteredByLevel.length > 0) {
        profileStatusItems = filteredByStatus.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
        profileLevelItems = filteredByLevel.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      }
    }

    const optionsSubject = [
      { label: "Odaberite predmete", value: 0 },
      { label: "Matematika", value: "Matematika" },
      { label: "Hrvatski", value: "Hrvatski" },
      { label: "Seminari", value: "Seminari" }
    ];

    // Select options for level
    const optionsLevel = [
      { label: "Odaberite stupanj", value: 0 },
      { label: "Predškolski", value: "Predškolski" },
      { label: "Osnovnoškolski", value: "Osnovnoškolski" },
      { label: "Srednjoškolski", value: "Srednjoškolski" },
      { label: "Fakultet", value: "Fakultet" }
    ];

    const optionsLocation = [
      { label: "Odaberite svoj grad", value: 0 },
      { label: "Split", value: "Split" },
      { label: "Zagreb", value: "Zagreb" },
      { label: "Osijek", value: "Osijek" }
    ];

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className={styles.background2p}>
              <h1 className={styles.title}>Repete.hr</h1>
              <p className={styles.subtitle}>Pronađi najbolje repeticije</p>
              <form onSubmit={this.onSubmit}>
                <div className={styles.formFP}>
                  <SelectListGroup
                    placeholder="Location"
                    name="location"
                    value={this.state.location}
                    onChange={this.onChange}
                    options={optionsLocation}
                    error={errors.location}
                    className={styles.category}
                  />
                  <SelectListGroup
                    placeholder="Subject"
                    name="subject"
                    value={this.state.subject}
                    onChange={this.onChange}
                    options={optionsSubject}
                    error={errors.subject}
                    className={styles.category}
                  />
                  <SelectListGroup
                    placeholder="Level"
                    name="level"
                    value={this.state.level}
                    onChange={this.onChange}
                    options={optionsLevel}
                    error={errors.level}
                    className={styles.category}
                  />

                  <input
                    type="submit"
                    value="Pretraga"
                    className={styles.submitButton}
                  />
                </div>
                <div>
                  {profileStatusItems}
                  {profileLevelItems}
                </div>
              </form>
            </div>
            {this.props.history.location.pathname === "/profiles" &&
              profileItems}
          </div>
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
