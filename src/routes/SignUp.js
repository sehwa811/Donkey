import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { createUserData, auth } from "../fbase";

import styled from "styled-components";

const StyledDiv = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    * {
      margin: 10px;
    }

    input {
      width: 250px;
      height: 45px;
      font-size: 20px;
    }

    button {
      width: 130px;
      height: 40px;
    }
  }

  @media screen and (max-width:400px) {
    grid-column: 1 / 2;

    h1 {
      font-size: 20px;
    }

    form {
      input {
          width: 180px;
          height: 40px;
          font-size: 15px;
      }

      button{
        width: 100px;
        height: 35px;
      }
    }
    
}
`;


const SignUp = () => {
  const [inputs, setInputs] = useState({
    displayName: "",
    email: "",
    password: "",
  });
  const { displayName, email, password } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const NavigateToMain = () => {
    navigate("/");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(user, { displayName: displayName });
    await createUserData(user);
    NavigateToMain();
  };

  return (
    <StyledDiv>
      <h1>계정을 만들어주세요</h1>
      <form onSubmit={onSubmit}>
        <input
          name="displayName"
          value={displayName}
          type="text"
          placeholder="name"
          onChange={onChange}
        />
        <input
          name="email"
          value={email}
          type="email"
          placeholder="email"
          onChange={onChange}
        />
        <input
          name="password"
          value={password}
          type="password"
          placeholder="password"
          onChange={onChange}
        />
        <button>Sign Up</button>
      </form>
    </StyledDiv>
  );
};

export default SignUp;
