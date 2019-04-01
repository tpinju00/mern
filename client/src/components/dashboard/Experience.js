import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profileActions";
import styles from "./styles.module.css";

class Experience extends Component {
  onDeleteClick(id) {
    this.props.deleteExperience(id);
  }
  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
          {exp.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, exp._id)}
            className={styles.deleteButton}
          >
            Izbriši
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className={styles.semiTitle}>Informacije o iskustvu</h4>
        <table className={styles.allInfo}>
          <div>
            <div className={styles.semiCategories}>
              <th>Tvrtka</th>
              <th>Naziv</th>
              <th>Godine</th>
            </div>
            <div className={styles.semiCategories2}>{experience}</div>
          </div>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(Experience);
