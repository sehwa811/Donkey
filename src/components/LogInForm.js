import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../fbase";

import './LoginForm.styles.scss'

const LogInForm = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputs;
  //useContext

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const NavigateToHome = () => {
    navigate("/home");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      //console.log(data.user.displayName);
      NavigateToHome();

    } catch (error) {
        alert("Please check your email or password")
    }

  };

  return (
    <>
      <form className='input-form' onSubmit={onSubmit}>
        <h1>로그인 해주세요</h1>
        <input name="email" value={email} onChange={onChange} type="email" />
        <input
          name="password"
          value={password}
          onChange={onChange}
          type="password"
        />
        <button>Log In</button>
      </form>
    </>
  );
};

export default LogInForm;
