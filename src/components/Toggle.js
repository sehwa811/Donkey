import { useState, useRef } from "react";

import ToggleContents from "./ToggleContents";

import styled from "styled-components";
import { RxHamburgerMenu } from "react-icons/rx";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  position: absolute;
  top: 40px;
  right: 20px;

  .toggle-button {
    width: 40px;
    border: none;
    background-color: transparent;
    font-size: 25px;
    
  }

  @media screen and (max-width: 400px) {
    right: 20px;
    top: 27px;

    button {
      width: 70px;
      margin-right: 5px;
    }
  }
`;

const Toggle = () => {
  const [isToggleClicked, setIsToggleClicked] = useState(false);

  const onClick = () => {
    setIsToggleClicked(prev => !prev)
  };

  return (
    <StyledDiv className="toggle-box">
      <button className="toggle-button" onClick={onClick}>
        <RxHamburgerMenu />
      </button>
      {isToggleClicked && <ToggleContents />}
    </StyledDiv>
  );
};

export default Toggle;

