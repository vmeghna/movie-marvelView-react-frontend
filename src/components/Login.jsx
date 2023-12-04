import React, { useRef, useState } from "react";
import { checkValidData } from "../utils/validate";
// import { auth } from "../utils/firebase";
// import Header from "./header";
// import { Header } from "./header/Header";
import Header from "./../../src/components/header/Header.jsx";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "./../utils/firebase.js";

import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../components/UserContext.jsx";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
// import { addUser } from "../redux/userSlice";
import App from "../App.jsx";

const Login = () => {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  // const email = useRef(null);
  // const password = useRef(null);
  // const name = useRef(null);

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const { setUser, setFormFields, formFields } = useUser();
  const { displayName, email, password, confirmPassword } = formFields;

  const toggleSignInForm = () => {
    setIsSignedIn(!isSignedIn);
  };

  const navigate = useNavigate();
  const signInWithGoogle = async (event) => {
    event.preventDefault();
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
    setUser(user.email, user.displayName);
    // navigate("/cart");
    // console.log(userDocRef.firestore._firestoreClient.user.uid);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("hit");
    if (email && password) {
      try {
        const { user } = await signInAuthUserWithEmailAndPassword(
          email,
          password
        );
        console.log({ user });
        setFormFields({ email: "", password: "", confirmPassword: "" });

        if (user) {
          setUser(user.email, user.displayName);
          console.log(user.email);
          console.log(toast(`User Login done`, "success"));
          navigate("/");
        }
      } catch (err) {
        console.log("Error Occurd while Login", err.message);
        console.log(err.code);
        if (err.code === "auth/invalid-credential") {
          alert("Invalid Credentials");
        }
      }
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="main-login">
      <ToastContainer />
      <div className="hidden ">
        <Header />
      </div>
      <div>
        {/* <img
          className="object-contain w-screen h-screen newel"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/00103100-5b45-4d4f-af32-342649f1bda5/3bd48e1e-8f08-497c-b50b-44d0aebc2a65/US-en-20230821-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="background-img"
        /> */}
      </div>
      <form className="h-auto py-0 md:py-2  absolute md:h-78  mx-auto right-0 left-0 p-8 mt-16 md:p-12 bg-black sm:w-2/4  md:w-5/12  xl:w-4/12  bg-opacity-80 text-white w-3/4 max-h-[800px] sm:mt-[150px] md:mt-[110px]">
        <h1 className="py-4 text-3xl font-bold text-center">
          {isSignedIn === true ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignedIn && (
          <input
            ref={name}
            type="text"
            placeholder="Username"
            className="p-4 my-4 w-full bg-[#333] rounded-lg"
          />
        )}
        <input
          // ref={email}

          type="email"
          name="email"
          id="email"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-[#333] rounded-lg"
          onChange={changeHandler}
        />

        <input
          // ref={password}
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="p-4 my-4  w-full bg-[#333] rounded-lg"
          onChange={changeHandler}
        />
        <p className="py-2 text-xl font-bold text-red-500">{errorMessage}</p>
        <button
          className="w-full p-2 bg-red-600 rounded-lg cursor-pointer md:my-6"
          onClick={submitHandler}
        >
          Sign In
          {/* {isSignedIn === true ? "Sign In" : "Sign Up"} */}
        </button>
        <Link to="/signup"> New User? Sign Up Here</Link>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {/* {isSignedIn === true
            ? "  New to Netflix ? Sign up"
            : "Already Registered ? Sign In "} */}
        </p>
      </form>
    </div>
  );
};

export default Login;
