import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./Main";
import Header from "./Header";
import SignUp from "./SignUp";
import Home from "./Home";
import Profile from "./Profile";
import MyContents from "./myContents";

import styled from "styled-components";

const StyledDiv = styled.div`

`

const AllRoute = () => {
  return (
    <StyledDiv className="all-routers">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<Main />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/mycontents" element={<MyContents />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StyledDiv>
  );
};

export default AllRoute;
