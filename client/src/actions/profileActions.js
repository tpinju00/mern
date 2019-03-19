import axios from "axios";

import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  GET_PROFILES
} from "./types";

//post a picture
export const postProfilePicture = (
  selectedFile,
  selectedFileName
) => dispatch => {
  dispatch(setProfileLoading());
  const data = new FormData();
  data.append("file", this.state.selectedFile, this.state.selectedFile.name);
  axios
    .post("api/profile/upload", {
      onUploadProgress: ProgressEvent => {
        this.setState({
          loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
        });
      }
    })
    .then(res => {
      console.log(res.statusText);
    });
};

//get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

//Get all profiles
// @param - filters - Object - Object with all filters inside. EG:
// {
//   skills: "CSS",
//   status:"Developer"
// }
export const getProfiles = filters => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all", { params: filters })
    .then(res =>
      dispatch(
        {
          type: GET_PROFILES,
          payload: res.data
        },
        console.log("glupsi:", res.data)
      )
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

//get profile by level
export const getProfileByLevel = (level, history) => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`api/profile/all/level/${level}`)
    .then(res => {
      history.push(`/profiles`);
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

//get profile by status
export const getProfileByStatus = (status, level, history) => dispatch => {
  if (level && status) {
    console.log("level je:", level);
  }
  dispatch(setProfileLoading());
  axios
    .get(`api/profile/all/status/${status}`)
    .then(res => {
      //I need a Dinamic Url here for multiple choices, not just status and then many status options, but the "status=" part should be
      history.push(`/profiles?` + "status=" + `${status}`);
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

//get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  console.log("profile Data in profile act", profileData);
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Add experience
export const addExperience = (expData, history) => dispatch => {
  axios
    .post("/api/profile/experience", expData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Add education
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post("/api/profile/education", eduData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Delete experience
export const deleteExperience = id => dispatch => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Delete education
export const deleteEducation = id => dispatch => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Delete account & profile
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure you want to delete your account?")) {
    axios
      .delete("/api/profile")
      .then(res =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};
//profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

//profile clear
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
