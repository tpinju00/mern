import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile } from "../../actions/profileActions";
import axios from "axios";
import Select from "react-select";
import styles from "./styles.module.css";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      price: "",
      location: "",
      subjects: "",
      levels: "",
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
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
        alert("Slika je uspješno dodana!");
      })
      .catch(error => {});
  };

  handleChange = subjects => {
    //const selectedValues = subjects.map(el => el.value);
    //console.log(`Option selected:`, subjects[0].value);

    this.setState({ subjects });
  };

  handleLevelsChange = selectedLevels => {
    if (selectedLevels.length < 9) {
      this.setState({ levels: selectedLevels });
      console.log("levels on change", this.state.levels);
    } else {
      console.log("Prekoračili ste broj dozvoljenih razina");
    }
  };

  // Select options for status
  optionsSubject = [
    { label: "* Odaberite predmete", value: 0 },
    { label: "Matematika", value: "Matematika" },
    { label: "Hrvatski", value: "Hrvatski" },
    { label: "Seminari", value: "Seminari" }
  ];

  optionsLevel = [
    { label: "* Odaberi svoj nivo podučavanja", value: 0 },
    { label: "Predškolski", value: "Predškolski" },
    { label: "Osnovnoškolski", value: "Osnovnoškolski" },
    { label: "Srednjoškolski", value: "Srednjoškolski" },
    { label: "Fakultet", value: "Fakultet" }
  ];

  optionsLocation = [
    { label: "* Odaberite svoj grad", value: 0 },
    { label: "Split", value: "Split" },
    { label: "Zagreb", value: "Zagreb" },
    { label: "Osijek", value: "Osijek" }
  ];

  render() {
    const { errors, displaySocialInputs } = this.state;
    const { profile } = this.props.profile;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Link na Facebook profil"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
            selected={true}
            className
          />

          <InputGroup
            placeholder="Link na Instagram profil"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
            selected={true}
            className
          />

          <InputGroup
            placeholder="Link na Twitter profil"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
            selected={true}
            className
          />

          <InputGroup
            placeholder="Link na LinkedIN profil"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
            selected={true}
            className
          />

          <InputGroup
            placeholder="Link na Youtube kanal"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
            selected={true}
            className
          />
        </div>
      );
    }

    return (
      <div className>
        <div className>
          <div className>
            <h1 className={styles.title}>Napravite svoj profil</h1>

            <small className={styles.requiredFields}>* = obavezna polja</small>
            <div className={styles.allForm}>
              <div className={styles.imageUpload}>
                <input
                  type="file"
                  name="profileImage"
                  onChange={this.fileSelectedHandler}
                />
                <button
                  className={styles.uploadButton}
                  onClick={() =>
                    this.fileUploadHandler({
                      profileId: profile._id
                    })
                  }
                >
                  Učitaj
                </button>
              </div>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  selected={true}
                  className={styles.formGroup}
                />
                <p className={styles.infoBox}>
                  Jedinstveno ime za vaš profil, npr. puno ime i prezime, ime
                  tvrtke, nadimak
                </p>
                <SelectListGroup
                  placeholder="* Lokacija"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  options={this.optionsLocation}
                  error={errors.location}
                  selected={true}
                  className={styles.formSelect}
                />
                <p className={styles.infoBox}>
                  Odaberi lokaciju održavanja repeticija
                </p>
                <Select
                  placeholder="* Predmeti"
                  name="subjects"
                  value={this.state.subjects}
                  onChange={this.handleChange}
                  options={this.optionsSubject}
                  isMulti={true}
                />
                <p className={styles.infoBox}>
                  Odaberi predmet za kojeg se održavaju repeticije
                </p>
                <Select
                  placeholder="* Razine"
                  name="levels"
                  value={this.state.levels}
                  onChange={this.handleLevelsChange}
                  options={this.optionsLevel}
                  isMulti={true}
                />
                <p className={styles.infoBox}>
                  Odaberi level učenika za repeticije
                </p>
                <TextFieldGroup
                  placeholder="Tvrtka"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  selected={true}
                  className={styles.formGroup}
                />
                <p className={styles.infoBox}>
                  Tvrtka u čijem ste vlasništvu ili tvrtka zaposlenja
                </p>
                <TextFieldGroup
                  placeholder="* Cijena"
                  name="price"
                  value={this.state.price}
                  onChange={this.onChange}
                  error={errors.price}
                  selected={true}
                  className={styles.formGroup}
                />
                <p className={styles.infoBox}>Cijena instrukcija po satu</p>
                <TextFieldGroup
                  placeholder="Vještine"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  selected={true}
                  className={styles.formGroup}
                />
                <p className={styles.infoBox}>
                  Koristite zarez za različite vještine
                </p>
                <TextFieldGroup
                  placeholder="Github korisničko ime"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  selected={true}
                  className={styles.formGroup}
                />
                <p className={styles.infoBox}>
                  Ako želite da je vaš Github repozitorij vidljiv
                </p>
                <TextAreaFieldGroup
                  placeholder="Kratke informacije o korisniku"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  selected={true}
                  className={styles.formGroup}
                />
                <p className={styles.infoBox}>Napišite nešto o sebi</p>
                <div className>
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className={styles.buttonDM}
                  >
                    Dodaj linkove za društvene mreže
                  </button>
                  <span>Neobavezno</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Potvrdi"
                  className={styles.buttonDM}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
