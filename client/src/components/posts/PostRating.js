import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { addRating } from "../../actions/postActions";

class PostRating extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick({ id, ratingNumber }) {
    const handle = this.props.handle;
    this.props.addRating({ id, ratingNumber, handle });
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(ratings) {
    const { auth } = this.props;
    if (ratings.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    const { post, auth, showActions } = this.props;
    const { profile } = this.props.profile;
    return (
      <div>
        <button
          onClick={() => this.onLikeClick({ id: profile._id, ratingNumber: 5 })}
          type="button"
          className="btn btn-light mr-1"
        >
          <i
            className={classnames("fas fa-thumbs-up", {
              "text-info": this.findUserLike(profile.ratings)
            })}
          />
          <span className="badge badge-light">
            {profile.ratings.ratingNumber}
          </span>
        </button>
      </div>
    );
  }
}

PostRating.defaultProps = {
  showActions: true
};

PostRating.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addRating: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { addRating }
)(PostRating);