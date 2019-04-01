import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profileActions";
import styles from "./styles.module.css";

class Education extends Component {
  onDeleteClick(id) {
    this.props.deleteEducation(id);
  }
  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
          {edu.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, edu._id)}
            className={styles.deleteButton}
          >
            Izbriši
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className={styles.semiTitle}>Informacije o obrazovanju</h4>
        <table className={styles.allInfo}>
          <div>
            <div className={styles.semiCategories}>
              <th>Škola</th>
              <th>Stečeni naslov</th>
              <th>Godine</th>
            </div>
            <div className={styles.semiCategories2}>{education}</div>
          </div>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
