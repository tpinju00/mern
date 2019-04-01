import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { addRating } from "../../actions/postActions";
import styles from "./styles.module.css";

class PostRating extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick({ id, profileId, profileUserId, ratingNumber }) {
    const handle = this.props.handle;
    this.props.addRating({
      id,
      profileId,
      profileUserId,
      ratingNumber,
      handle
    });
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
    const { auth } = this.props;
    const { profile } = this.props.profile;
    console.log(auth.user.id);
    console.log("tomas", profile.user._id);

    return (
      <div className={styles.rate}>
        <button
          onClick={() =>
            this.onLikeClick({
              id: auth.user.id,
              profileId: profile._id,
              profileUserId: profile.user._id,
              ratingNumber: 1
            })
          }
          className={styles.rate}
          id="star1"
          value="1"
        >
          <label
            for="star1"
            title="text"
            className={classnames({
              "text-info": this.findUserLike(profile.ratings)
            })}
          />
        </button>
        <button
          onClick={() =>
            this.onLikeClick({
              id: auth.user.id,
              profileId: profile._id,
              profileUserId: profile.user._id,
              ratingNumber: 2
            })
          }
          className={styles.rate}
          id="star2"
          value="2"
        >
          <label
            for="star2"
            title="text"
            className={classnames({
              "text-info": this.findUserLike(profile.ratings)
            })}
          />
        </button>
        <button
          onClick={() =>
            this.onLikeClick({
              id: auth.user.id,
              profileId: profile._id,
              profileUserId: profile.user._id,
              ratingNumber: 3
            })
          }
          className={styles.rate}
          id="star3"
          value="3"
        >
          <label
            for="star3"
            title="text"
            className={classnames({
              "text-info": this.findUserLike(profile.ratings)
            })}
          />
        </button>
        <button
          onClick={() =>
            this.onLikeClick({
              id: auth.user.id,
              profileId: profile._id,
              profileUserId: profile.user._id,
              ratingNumber: 4
            })
          }
          className={styles.rate}
          id="star4"
          value="4"
        >
          <label
            for="star4"
            title="text"
            className={classnames({
              "text-info": this.findUserLike(profile.ratings)
            })}
          />
          <span>{profile.ratings.ratingNumber}</span>
        </button>
        <button
          onClick={() =>
            this.onLikeClick({
              id: auth.user.id,
              profileId: profile._id,
              profileUserId: profile.user._id,
              ratingNumber: 5
            })
          }
          className={styles.rate}
          id="star5"
          value="5"
        >
          <label
            for="star5"
            title="text"
            className={classnames({
              "text-info": this.findUserLike(profile.ratings)
            })}
          />
        </button>
        <span className={styles.totalNumRating}>{profile.totalRating}</span>
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
  profile: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  user: state.user
});

export default connect(
  mapStateToProps,
  { addRating }
)(PostRating);
