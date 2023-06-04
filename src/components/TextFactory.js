import React, { useContext, useState } from "react";
import { addDoc, collection } from "firebase/firestore";

import { db } from "../fbase";

import styled from "styled-components";
import { BsFillSendFill } from "react-icons/bs";
import { UserContext } from "../contexts/usercontext";

const StyledForm = styled.form`
  padding: 30px 10px;

  input {
    width: 450px;
    height: 50px;
    font-size: 20px;
    border-radius: 30px;
    border: solid #eff3f4;
    padding-left: 15px;
  }

  input:focus {
    outline: 2px solid #1d9bf0;
  }

  button {
    position: relative;
    top: 5px;
    margin-left: 10px;
    font-size: 30px;
    background-color: transparent;
    border: none;
    text-align: left;
    z-index: 1;
    color: #1d9bf0;
    }
  }

  @media screen and (max-width: 400px) {
    width: 270px;
    height: 100px;
    padding: 15px 5px;

    input {
      width: 210px;
      height: 40px;
      font-size: 15px;
    }

    button {
      width: 35px;
      font-size: 20px;
      margin-left: 13px;
    }
  }
`;

function TextFactory() {
  const [text, setText] = useState("");
  const { currentUser } = useContext(UserContext);

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (text === "") {
      return;
    }

    const contentObj = {
      text: text,
      createdAt: Date.now(),
      creatorId: currentUser.uid,
    };
    await addDoc(collection(db, "contents"), contentObj);
    setText("");
  };

  return (
    <>
      <StyledForm onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={text}
          type="text"
          placeholder=" 임금님 귀는 당나귀 귀!"
        />
        <button>
          <BsFillSendFill />
        </button>
      </StyledForm>
    </>
  );
}

export default TextFactory;
