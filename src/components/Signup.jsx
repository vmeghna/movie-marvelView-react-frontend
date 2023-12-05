import React from "react";
import { useUser } from "./UserContext.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../utils/firebase.js";

const SignUp = () => {
  const navigate = useNavigate();
  const { setFormFields, formFields } = useUser();
  const { displayName, email, password, confirmPassword } = formFields;
  const submitHandler = async (e) => {
    e.preventDefault();
    // if (password !== confirmPassword) {
    //   alert("Password do not Match");
    //   return;
    // }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      const userDocRef = await createUserDocumentFromAuth(user, {
        displayName,
      });
      if (userDocRef) {
        console.log(toast(`SignUp success,Move To Login`, "success"));
        navigate("/Login");
      }
      //   setFormFields(formFields);
      // setFormFields({
      //   displayName: "",
      //   email: "",
      //   password: "",
      //   confirmPassword: "",
      // });
    } catch (err) {
      console.log("Something Happened", err.message);
      console.log(err.code);
      console.error("Error creating User", err.message);
      console.error("Error code:", err.code);
      console.error("Error details:", err);
      if (err.code === "auth/email-already-in-use") {
        console.log(
          toast(`Email Already Exists..! Please use alternate Email`, "success")
        );

        // alert("Email Already Exists Please use alternate Email");
      } else if (err.code === "auth/weak-password") {
        console.log(
          toast(`Password must be at least 6 characters long`, "Failure")
        );
        // alert("Password must be at least 6 characters long");
      }
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className="signup">
      <section className="main-sign-up">
        <form className="reg-container" onSubmit={submitHandler}>
          <h1 className="names">Sign Up </h1>
          <div className="form-group">
            <label htmlFor="display-name">Username:</label>
            <input
              type="text"
              id="display-name"
              name="displayName"
              required
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              onChange={changeHandler}
            />
          </div>
          <div className="form-group">
            <button className="small" type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default SignUp;
