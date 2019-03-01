import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getProfiles } from "../../actions/profileActions";
import ProfileItem from "./ProfileItem";
import { getProfileByStatus } from "../../actions/profileActions";
import SelectListGroup from "../common/SelectListGroup";
import isEmpty from "../../validation/is-empty";
import { withRouter } from "react-router-dom";

class Profiles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: "",
      filteredByStatus: [],
      filteredByLevel: [],
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (!this.props.skipMounting) {
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

    this.props.getProfileByStatus(this.state.status, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    const { errors } = this.state;
    const { filteredByStatus } = this.state;
    let profileStatusItems;

    console.log(profiles);

    if (isEmpty(profiles) || loading) {
      //profileStatusItems = <Spinner />;
    } else {
      if (!isEmpty(profiles) && isEmpty(filteredByStatus)) {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else if (filteredByStatus.length > 0) {
        profileStatusItems = filteredByStatus.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileItems = profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      }
    }

    const options = [
      { label: "* Select Professional Status", value: 0 },
      { label: "Developer", value: "Developer" },
      { label: "Student", value: "Student" },
      { label: "Senior Developer", value: "Senior Developer" },
      { label: "Manager", value: "Manager" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];

    // Select options for level
    const optionsLevel = [
      { label: "* Odaberi svoj nivo podučavanja", value: 0 },
      { label: "Predškolski", value: "Predškolski" },
      { label: "Osnovnoškolski", value: "Osnovnoškolski" },
      { label: "Srednjoškolski", value: "Srednjoškolski" },
      { label: "Fakultetski", value: "Fakultetski" },
      { label: "Student or Learning", value: "Student or Learning" },
      { label: "Instructor or Teacher", value: "Instructor or Teacher" },
      { label: "Intern", value: "Intern" },
      { label: "Other", value: "Other" }
    ];

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer profiles</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
              <form onSubmit={this.onSubmit}>
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Give us an idea of where you are at in your career"
                />
                <SelectListGroup
                  placeholder="Level"
                  name="level"
                  value={this.state.level}
                  onChange={this.onChange}
                  options={optionsLevel}
                  error={errors.level}
                  info="Give us an idea of where you are at in your career"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />

                <div>{profileStatusItems}</div>
              </form>
              {profileItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  getProfileByStatus: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles, getProfileByStatus }
)(withRouter(Profiles));
