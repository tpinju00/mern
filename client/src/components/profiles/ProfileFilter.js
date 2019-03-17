import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfiles } from "../../actions/profileActions";
import SelectListGroup from "../common/SelectListGroup";
import { withRouter } from "react-router-dom";
import styles from "./styles.module.css";

class ProfileFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      level: "",
      subjects: "",
      location: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    console.log("mount", this.props.newSkipMounting);
    if (this.props.newSkipMounting) {
      this.props.getProfiles();
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const filters = {};

    if (this.state.location !== "") {
      filters.location = this.state.location;
    }

    if (this.state.subjects !== "") {
      filters.subjects = this.state.subjects;
    }
    if (this.state.level !== "") {
      filters.level = this.state.level;
    }

    this.props.sendData(filters);

    //this.props.getProfiles(filters);

    //redirect to /profiles
    //this.props.history.push("/profiles", { redirect: "submit" });

    console.log("level", this.state.level);

    this.setState({
      level: this.state.level,
      subjects: this.state.subjects,
      location: this.state.location
    });

    let skipMounting = true;

    this.props.history.push({
      pathname: "/profiles",
      state: {
        level: this.state.level,
        subjects: this.state.subjects,
        location: this.state.location,
        filters: filters
      }
    });
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
      <div>
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
                placeholder="Subjects"
                name="subjects"
                value={this.state.subjects}
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
      </div>
    );
  }
}

ProfileFilter.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(withRouter(ProfileFilter));
