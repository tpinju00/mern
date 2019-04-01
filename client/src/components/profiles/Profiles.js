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
import isEmpty from "../../validation/is-empty";
import { withRouter } from "react-router-dom";
import ReactPaginate from "react-paginate";

class Profiles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      levels: "",
      subjects: "",
      location: "",
      filterParams: [],
      errors: {},
      pageCount: "",
      perPage: ""
    };

    this.getFilterData = this.getFilterData.bind(this);
  }

  componentDidMount() {
    //const history = createHistory();
    //console.log("history", history);

    if (this.props.location.state) {
      console.log("filters iz stanja", this.props.location.state.filters);

      // if (this.props.location.state.filters.location) {
      //   this.setState({ location: this.props.location.state.filters.location });
      // }

      this.setState({ filterParams: this.props.location.state.filters }, () => {
        console.log("offsetPOCETAK", this.state.filterParams);
        this.props.getProfiles(
          this.state.filterParams,
          this.state.perPage,
          this.state.offset
        );
      });

      // this.props.getProfiles(this.props.location.state.filters);
    } else {
      this.setState({ filterParams: "" });
      this.props.getProfiles().then(() => {
        let numberOfPages = Math.ceil(this.props.profiles.meta.total_count / 3);
        this.setState({ pageCount: numberOfPages });
        console.log("page count", this.props.profiles.meta.total_count);
      });
    }
  }

  handlePageClick = data => {
    var selected = data.selected;
    console.log("selected", selected);
    var perPage = 3;

    var offset = Math.ceil(selected * perPage);
    console.log("beginning of offset", offset);

    this.setState({ offset: offset, perPage: perPage }, () => {
      console.log("offsetPOCETAK", this.state.offset);
      this.props.getProfiles(
        this.state.filterParams,
        this.state.perPage,
        this.state.offset
      );
    });
  };

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
    const { profiles, loading } = this.props;
    let profileItems;

    //console.log("PRESKOCI2", newSkipMounting);

    //console.log(profiles);

    if (isEmpty(profiles.profiles) || loading) {
      //profileStatusItems = <Spinner />;
    } else {
      //console.log("filter", this.props.skipMounting);
      if (isEmpty(profiles.profiles) || this.props.skipMounting) {
        profileItems = <h1>No profiles</h1>;
      } else {
        profileItems = profiles.profiles.map(profile => (
          <ProfileItem key={profile._id} profile={profile} />
        ));
      }
    }

    //console.log("broj stranica", this.state.pageCount);

    return (
      <div className="profiles">
        <div className="container">
          <ProfileFilter newSkipMounting sendData={this.getFilterData} />
          {this.props.history.location.pathname === "/profiles" && profileItems}
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
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
  profile: state.profile.profile,
  profiles: state.profile.profiles
});

export default connect(
  mapStateToProps,
  { getProfiles, getProfileByStatus, getProfileByLevel }
)(withRouter(Profiles));
