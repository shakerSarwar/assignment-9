import React, { useContext, useState } from "react";
import "./LogIn.css";
import firebase from "firebase/app";
import "firebase/auth";
import _ from "lodash/fp";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import firebaseConfig from "../firebase.config";
import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router";

//Firebase Initialize Start
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
//Firebase Initialize End

const LogIn = () => {
  const [logedInUser, setLogedInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };
  const { register, handleSubmit, errors } = useForm();
  const [creatNewAccount, setCreatNewAccount] = useState(false);

  //user object state start
  const [newUserInfo, setNewUserInfo] = useState({
    displayName: "",
    email: "",
    password: "",
    confarmPassword: "",
    error: "",
    success: false,
  });
  //user object state end

  //input filed value chnage handler start
  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewUserInfo({ ...newUserInfo, [name]: value });
  };
  //input filed value chnage handler end

  //sing in with google start
  const handelGoogleSingIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        const { displayName, email } = result.user;
        const singedInUser = { displayName, email };
        setLogedInUser(singedInUser);
        history.replace(from);
      })
      .catch((error) => {
        const newUser = { ...newUserInfo };
        newUser.error = error.message;
        setNewUserInfo(newUser);
      });
  };
  //sing in with google end

  //sing in with Facebook start
  const handelFacebookSingIn = () => {
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then((result) => {
        const { displayName, email } = result.user;
        const singedInUser = { displayName, email };
        setLogedInUser(singedInUser);
        history.replace(from);
      })
      .catch((error) => {
        const newUser = { ...newUserInfo };
        newUser.error = error.message;
        setNewUserInfo(newUser);
      });
  };
  //sing in with facebook end

  //handel log in for sing up with email and password start
  const onSubmit = (data) => {
    creatNewAccount
      ? firebase
          .auth()
          .createUserWithEmailAndPassword(
            newUserInfo.email,
            newUserInfo.password
          )
          .then((userCredential) => {
            const newUser = { ...newUserInfo };
            newUser.error = "";
            newUser.success = true;
            setLogedInUser(newUser);
            history.replace(from);
            updateUserInfo(newUserInfo.displayName);
          })
          .catch((error) => {
            const newUser = { ...newUserInfo };
            newUser.error = error.message;
            newUser.success = false;
            setNewUserInfo(newUser);
          })
      : firebase
          .auth()
          .signInWithEmailAndPassword(newUserInfo.email, newUserInfo.password)
          .then((userCredential) => {
            const newUser = { ...newUserInfo };
            newUser.error = "";
            newUser.success = true;
            setLogedInUser(newUser);
            history.replace(from);
            console.log(userCredential);
          })
          .catch((error) => {
            const newUser = { ...newUserInfo };
            newUser.success = false;
            newUser.error = error.message;
            setNewUserInfo(newUser);
          });
  };
  //handel log in for sing up with email and password start

  //upadte user info start
  const updateUserInfo = (name) => {
    const user = firebase.auth().currentUser;
    user
      .updateProfile({
        displayName: name,
      })
      .then(() => {
        console.log("user Info Update Seccessfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //upadte user info end

  return (
    <section className="container mt-5">
      <article className="col-md-6 mx-auto px-3">
        <div className="log-in-box border pt-3 pb-3 text-center">
          <h3 className="text-left px-3">Login</h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="logInOrRegisterFrom"
          >
            {/* Start Conditional Name Filed For Sing Up */}
            {creatNewAccount && (
              <input
                name="displayName"
                onChange={changeHandler}
                placeholder="Name"
                autoComplete="off"
                ref={register({
                  required: true,
                })}
              />
            )}
            {_.get("displayName.type", errors) === "required" && (
              <p className="error">Input Your Name</p>
            )}
            {/* End Conditional Name Filed For Sing Up */}

            <input
              name="email"
              onChange={changeHandler}
              placeholder="Email"
              autoComplete="off"
              ref={register({
                required: true,
                pattern: /\S+@\S+\.\S+/i,
              })}
            />
            {_.get("email.type", errors) === "required" && (
              <p className="error">This field is required</p>
            )}
            {_.get("email.type", errors) === "pattern" && (
              <p className="error">Input A Valid Email</p>
            )}

            <input
              name="password"
              onChange={changeHandler}
              placeholder="Password"
              autoComplete="off"
              ref={register({
                required: true,
                minLength: 4,
                pattern: /\d{1}/i,
              })}
            />
            {_.get("password.type", errors) === "required" && (
              <p className="error">This field is required</p>
            )}
            {_.get("password.type", errors) === "minLength" && (
              <p className="error">Password must be at least 5 digits</p>
            )}
            {_.get("password.type", errors) === "pattern" && (
              <p className="error">
                Password must be at least 1 numaric number
              </p>
            )}
            {/* Start Conditional Confarm Password Filed For Sing Up */}
            {creatNewAccount && (
              <input
                name="confarmPassword"
                onChange={changeHandler}
                placeholder="Confarm Password"
                autoComplete="off"
                ref={register({
                  required: true,
                  validate: (value) =>
                    value === newUserInfo.password ||
                    "The passwords do not match",
                })}
              />
            )}
            {_.get("confarmPassword.type", errors) === "required" && (
              <p className="error">This field is required</p>
            )}
            {errors.confarmPassword && (
              <p className="error">{errors.confarmPassword.message}</p>
            )}
            {/* Start Conditional Confarm Password Filed For Sing Up */}

            <div className="row mt-3">
              <div className="col-sm-6">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="defaultCheck1"
                  />
                  <label className="form-check-label" htmlFor="defaultCheck1">
                    Remember Me
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <a className="custom-color custom-underline" href="#">
                  Forgot Password
                </a>
              </div>
            </div>
            <input
              type="submit"
              className="btn btn-primary"
              value={creatNewAccount ? "Create an account" : "login"}
            />
          </form>
          <p style={{ color: "red" }}>{newUserInfo.error}</p>
          {newUserInfo.success && (
            <p style={{ color: "green" }}>
              User {creatNewAccount ? "Created" : "logedIn"} Successfully
            </p>
          )}

          {/* start Conditional change alredy have account text and functionality */}
          {creatNewAccount ? (
            <p className="font-weight-500 mt-3">
              Already have an account?
              <span
                className="custom-color custom-underline cursor-pointer"
                onClick={() => setCreatNewAccount(!creatNewAccount)}
              >
                Login
              </span>{" "}
            </p>
          ) : (
            <p className="font-weight-500 mt-3">
              Don't have an account?
              <span
                className="custom-color custom-underline cursor-pointer"
                onClick={() => setCreatNewAccount(!creatNewAccount)}
              >
                Creat an Account
              </span>{" "}
            </p>
          )}
          {/* start Conditional change alredy have account text and functionality */}
        </div>
      </article>
    </section>
  );
};

export default LogIn;
