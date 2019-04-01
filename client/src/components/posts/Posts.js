import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import Spinner from "../common/Spinner";
import { getPosts } from "../../actions/postActions";
import PostFeed from "./PostFeed";
import PostRating from "./PostRating";
import styles from "./styles.module.css";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts(this.props.handle);
    //console.log(this.props.handle);
  }
  render() {
    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} handle={this.props.handle} />;
    }

    return (
      <div>
        <div>
          <div className={styles.profile}>
            <div className={styles.grid}>
              <PostForm />
              <PostRating />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
