import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfileByStatus } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import ProfileItem from "../profiles/ProfileItem";

class FilterStatus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      filteredByStatus: [],
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      this.setState({ filteredByStatus: nextProps.profile.profile });
    }
  }

  render() {
    const { errors } = this.state;
    const { loading } = this.props.profile;
    const { filteredByStatus } = this.state;

    let profileStatusItems;

    if (filteredByStatus === null || loading) {
      profileStatusItems = <Spinner />;
    } else {
      if (filteredByStatus.length > 0) {
        profileStatusItems = filteredByStatus.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      } else {
        profileStatusItems = <h4>No filteredByStatus found...</h4>;
      }
    }
    return (
      <div>
        <div>{profileStatusItems}</div>
      </div>
    );
  }
}

FilterStatus.propTypes = {
  getProfileByStatus: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileByStatus }
)(FilterStatus);
