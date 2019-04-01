import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";
import axios from "axios";
import Select from "react-select";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      subjects: "",
      levels: "",
      company: "",
      price: "",
      location: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      errors: {},
      selectedFile: null
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // Bring skills array back to CSV
      const skillsCSV = profile.skills.join(",");

      // If profile field doesn't exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.price = !isEmpty(profile.price) ? profile.price : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.subjects = !isEmpty(profile.subjects) ? profile.subjects : "";
      profile.levels = !isEmpty(profile.levels) ? profile.levels : "";
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";

      // Set component fields state
      this.setState({
        handle: profile.handle,
        company: profile.company,
        price: profile.price,
        location: profile.location,
        subjects: profile.subjects,
        levels: profile.levels,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      price: this.state.price,
      location: this.state.location,
      subjects: this.state.subjects && this.state.subjects.map(el => el.value),
      levels: this.state.levels && this.state.levels.map(el => el.value),
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    });
  };

  fileUploadHandler = ({ profileId }) => {
    const formData = new FormData();
    formData.append("profileImage", this.state.selectedFile);
    formData.append("profileId", profileId);

    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    console.log("profile id", profileId);
    axios
      .post("api/profile/upload", formData, config)
      .then(response => {
        alert("The file is successfully uploaded");
      })
      .catch(error => {});
  };

  handleChange = subjects => {
    //const selectedValues = subjects.map(el => el.value);
    //console.log(`Option selected:`, subjects[0].value);
    if (subjects.length < 9) {
      this.setState({ subjects });
    } else {
      console.log("Prekoracili ste broj dozvoljenih kategorija");
    }
  };

  handleLevelsChange = selectedLevels => {
    if (selectedLevels.length < 9) {
      this.setState({ levels: selectedLevels });
      console.log("levels on change", this.state.levels);
    } else {
      console.log("Prekoracili ste broj dozvoljenih razina");
    }
  };

  render() {
    const { errors, displaySocialInputs } = this.state;
    const { profile } = this.props.profile;
    console.log("IDIDI", profile);

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />

          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
        </div>
      );
    }

    // Select options for status
    const optionsSubject = [
      { label: "* Odaberite predmete", value: 0 },
      { label: "Matematika", value: "Matematika" },
      { label: "Hrvatski", value: "Hrvatski" },
      { label: "Seminari", value: "Seminari" }
    ];

    // Select options for level
    const optionsLevel = [
      { label: "* Odaberi svoj nivo podučavanja", value: 0 },
      { label: "Predškolski", value: "Predškolski" },
      { label: "Osnovnoškolski", value: "Osnovnoškolski" },
      { label: "Srednjoškolski", value: "Srednjoškolski" },
      { label: "Fakultet", value: "Fakultet" }
    ];

    const optionsLocation = [
      { label: "* Odaberite svoj grad", value: 0 },
      { label: "Split", value: "Split" },
      { label: "Zagreb", value: "Zagreb" },
      { label: "Osijek", value: "Osijek" }
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Idi nazad
              </Link>
              <h1 className="display-4 text-center">Uredi vlastiti profil</h1>
              <small className="d-block pb-3">* = Obavezna polja</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname"
                />
                <SelectListGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  options={optionsLocation}
                  error={errors.location}
                  info="Odaberi lokaciju"
                />

                <Select
                  placeholder="Subjects"
                  name="subjects"
                  value={this.state.subjects}
                  onChange={this.handleChange}
                  options={optionsSubject}
                  isMulti={true}
                />

                <Select
                  placeholder="Levels"
                  name="levels"
                  value={this.state.levels}
                  onChange={this.handleLevelsChange}
                  options={optionsLevel}
                  isMulti={true}
                />

                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                />
                <TextFieldGroup
                  placeholder="price"
                  name="price"
                  value={this.state.price}
                  onChange={this.onChange}
                  error={errors.price}
                  info="Could be your own price or a company one"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="If you want your latest repos and a Github link, include your username"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Dodaj linkove za društvene mreže
                  </button>
                  <span className="text-muted">Opcionalno</span>
                </div>
                {socialInputs}

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
            <input
              type="file"
              name="profileImage"
              onChange={this.fileSelectedHandler}
            />
            <button
              onClick={() =>
                this.fileUploadHandler({
                  profileId: profile._id
                })
              }
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    );
  }
}
CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
