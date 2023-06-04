import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../contexts/usercontext";
import { auth } from "../fbase";

import styled from "styled-components";

const StyledUl = styled.ul`
  list-style-type: none;
  width: 160px;
  height: 200px;
  position: relative;
  font-size: 17px;
  padding: 20px;
  border: solid 1px #eff3f4;
  border-radius: 20px;
  background-color: #f7f9f9;

  li {
    margin-bottom: 10px;
  }

  a {
    text-decoration: none;
    color: black;
  }

  button {
    width: 80px;
    height: 35px;
    border: solid 1px black;
    background-color: transparent;
    text-align: center;
    font-size: 17px;
    cursor: pointer;
    margin-left: 0;
    padding: 4px;
    background-color: #1d9bf0;
    border-radius: 40px;
    border: none;
    color: white;
    transition: all 0.3s;
  }

  button:hover {
    background-color: #1a8cd9;
  }

  @media screen and (max-width: 400px) {
    width: 130px;
    height: 100px;
    font-size: 15px;
    padding: 15px;
    z-index: 2;
    right: 9px;

    button {
      font-size: 15px;
      width: 70px;
    }
  }
`;

const ToggleContents = () => {
  const { currentUser } = useContext(UserContext);
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const onLogOutClick = () => {
    auth.signOut();
    navigate("/");
    setCurrentUser(null);
  };

  return (
    <div>
      <StyledUl>
        {currentUser ? (
          <>
            <li>
              <a href="/mycontents">내가 쓴 글</a>
            </li>
            <button onClick={onLogOutClick}>로그아웃</button>
          </>
        ) : <li>로그인 해주세요.</li> }
      </StyledUl>
    </div>
  );
};

export default ToggleContents;
