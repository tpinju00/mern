import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../actions/postActions";
import styles from "./styles.module.css";

class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick({ id, ratingNumber }) {
    const handle = this.props.handle;
    this.props.addLike({ id, ratingNumber, handle });
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, auth, showActions } = this.props;

    return (
      <div className={styles.boxComment}>
        <div className>
          {/* <a href="profile.html" /> */}
          <br />
          <p className={styles.personName}>{post.name}</p>
          {/* {post.user === auth.user.id ? (
            <button
              onClick={this.onDeleteClick.bind(this, post._id)}
              type="button"
              className={styles.exButton}
            >
              <i className="fas fa-times" />
            </button>
          ) : null} */}
        </div>
        <div className>
          <p className>{post.text}</p>
          {showActions ? (
            <span>
              <Link to={`/post/${post._id}`} className={styles.commentsButton}>
                Komentari
              </Link>
            </span>
          ) : null}
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, addLike, removeLike }
)(PostItem);
