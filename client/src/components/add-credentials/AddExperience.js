import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addExperience } from "../../actions/profileActions";
import styles from "./styles.module.css";

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      title: "",
      location: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const expData = {
      company: this.state.company,
      title: this.state.title,
      location: this.state.location,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addExperience(expData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className>
        <div className>
          <div className>
            <div className>
              <Link to="/dashboard" className={styles.backTo}>
                Natrag
              </Link>
              <h1 className={styles.title}>Dodajte iskustvo</h1>
              <p className={styles.belowText}>
                Dodajte poslove i pozicije koje ste imali u prošlosti ili
                trenutno imate
              </p>
              <small className={styles.requiredFields}>
                * = obavezna polja
              </small>
              <br />
              <div className={styles.allForm}>
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="* Tvrtka"
                    name="company"
                    value={this.state.company}
                    onChange={this.onChange}
                    error={errors.company}
                    selected={true}
                    className={styles.formGroup}
                  />
                  <br />
                  <TextFieldGroup
                    placeholder="* Naziv"
                    name="title"
                    value={this.state.title}
                    onChange={this.onChange}
                    error={errors.title}
                    selected={true}
                    className={styles.formGroup}
                  />
                  <br />
                  <TextFieldGroup
                    placeholder="Lokacija"
                    name="location"
                    value={this.state.location}
                    onChange={this.onChange}
                    error={errors.location}
                    selected={true}
                    className={styles.formGroup}
                  />
                  <br />
                  <h6 className={styles.infoBox}>Datum početka</h6>
                  <TextFieldGroup
                    name="from"
                    type="date"
                    value={this.state.from}
                    onChange={this.onChange}
                    error={errors.from}
                    selected={true}
                    className={styles.formGroup}
                  />
                  <br />
                  <h6 className={styles.infoBox}>Datum kraja</h6>
                  <TextFieldGroup
                    name="to"
                    type="date"
                    value={this.state.to}
                    onChange={this.onChange}
                    error={errors.to}
                    disabled={this.state.disabled ? "disabled" : ""}
                    selected={true}
                    className={styles.formGroup}
                  />
                  <br />
                  <div className>
                    <input
                      type="checkbox"
                      className
                      name="current"
                      value={this.state.current}
                      checked={this.state.current}
                      onChange={this.onCheck}
                      id="current"
                    />
                    <label htmlFor="current" className={styles.infoBox}>
                      Trenutni posao
                    </label>
                  </div>
                  <br />
                  <TextAreaFieldGroup
                    placeholder="Opis posla"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                    error={errors.description}
                    selected={true}
                    className={styles.formGroup}
                  />
                  <p className={styles.infoBox}>
                    Recite nam nešto o vašoj trenutnoj poziciji
                  </p>
                  <br />
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
      </div>
    );
  }
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addExperience }
)(withRouter(AddExperience));
