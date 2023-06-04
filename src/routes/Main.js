//import React, { useEffect, useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { auth, createUserData } from "../fbase";
import LogInForm from "../components/LogInForm";
//import Home from "./Home";

import styled from "styled-components";

const StyledDiv = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;

  button {
    border-radius: 30px;
    border: none;
    background-color: #eff3f4;
    transition: all 0.3s;
  }

  button:hover {
    background-color: #e6e8e8;
  }

  .signup-button {
    width: 100px;
    height: 40px;
  }

  .google-button {
    width: 150px;
    margin-left: 5px;
    height: 40px;
    background-color: #1d9bf0;
    color: white;
  }

  .google-button:hover {
    background-color: #1a8cd9;
  }

  @media screen and (max-width: 320px) {
    grid-column: 1 / 2;
    margin-top: 15px;

    .signup-button {
      width: 80px;
      height: 35px;
    }

    .google-button {
      width: 150px;
      height: 35px;
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  width: 100px;
  height: 35px;
`;

const Main = () => {
  const onGoogleClick = async (e) => {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    await createUserData(user);
    NavigateToHome();
  };

  const navigate = useNavigate(); //얘를 NavigateToSignIn안으로 넣으면 에러난다
  const NavigateToHome = () => {
    navigate("/home");
  };

  return (
    <>
      <StyledDiv className="login-form">
        <LogInForm />
        <div className="buttons">
          <button className="signup-button">
            <StyledLink to="/signup">Sign Up</StyledLink>
          </button>
          <button className="google-button" onClick={onGoogleClick}>
            Sign In with Google
          </button>
        </div>
      </StyledDiv>
    </>
  );
};

export default Main;
