import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    //Get first name
    const firstName = profile.user.name.trim().split(" ")[0];

    // Skill list
    const skills = profile.skills.map((skill, index) => (
      <div key={index} className="p-3">
        <i className="fa fa-check" />
        {skill}
      </div>
    ));
    return (
      <div>
        <div class="row">
          <div class="col-md-12">
            <div class="card card-body bg-light mb-3">
              <h3 class="text-center text-info">{firstName}'s Bio</h3>
              <p class="lead">
                {isEmpty(profile.bio) ? (
                  <span>{firstName} doesn't have a bio.</span>
                ) : (
                  <spain>{profile.bio}</spain>
                )}
              </p>
              <hr />
              <h3 class="text-center text-info">Skill Set</h3>
              <div class="row">
                <div class="d-flex flex-wrap justify-content-center align-items-center">
                  {skills}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileAbout;