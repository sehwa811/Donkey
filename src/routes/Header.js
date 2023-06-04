import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { UserContext } from "../contexts/usercontext";
import Main from "./Main";

import styled from "styled-components";
import Toggle from "../components/Toggle";

import { GiDonkey } from "react-icons/gi";

const StyledContainer = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr 1fr;
  grid-template-columns: repeat(3, minmax(200px, auto));

  @media screen and (max-width: 400px) {
    grid-template-rows: 100px 1fr 1fr;
    grid-template-columns: 1fr;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  grid-column: 1 / 4;
  width: 100%;
  height: 100px;
  align-items: center;

  .logo-button {
    margin-left: 20px;
    border: none;
    background-color: transparent;
    font-size: 35px;
    cursor: pointer;
  }

  a {
    text-decoration: none;
    color: black;
  }

  @media screen and (max-width: 400px) {
    width: 100%;
    height: 70px;
    font-size: 9px;

    .logo-button  {
      font-size: 20px;
    }
  }
`;

const Header = () => {
  const { currentUser } = useContext(UserContext);

  const navigate = useNavigate();
  
  const NavigateToHome = () => {
    navigate("/home");
  };

  const NavigateToMain = () => {
    navigate("/");
  }

  const handleOnclick = () => {
    if (currentUser) {
      NavigateToHome();
    } else {
      NavigateToMain();
    }
  }


  return (
    <StyledContainer className="all-container">
      <StyledHeader className="header-container">
          <button className='logo-button' onClick={handleOnclick}><GiDonkey /> 임금님 귀는 당나귀 귀</button>
        <Toggle />
      </StyledHeader>
      <Outlet />
    </StyledContainer>
  );
};

export default Header;
