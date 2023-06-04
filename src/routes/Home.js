import React, { useState, useEffect, useContext } from "react";

import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

//import { UserContext } from "../contexts/usercontext";
import { db } from "../fbase";
import Texts from "../components/Texts";
import TextFactory from "../components/TextFactory";

import styled from "styled-components";
import { UserContext } from "../contexts/usercontext";
import Main from "./Main";

const StyledDiv = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;

  @media screen and (max-width: 400px) {
    grid-column: 1 / 3;
    margin-top: 0px;
  }
`;

function Home() {
  const { currentUser } = useContext(UserContext);
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const dbContents = query(
      collection(db, "contents")
      //orderBy("createdAt", "desc")
    );
    onSnapshot(dbContents, (snapshot) => {
      const contentsArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContents(contentsArr);
    });
  }, []);
  //useEffect의 두 번째 매개변수로 []을 넣어줘야 무한 렌더링에서 빠져나온다

  return (
    <>
      <StyledDiv>
        <TextFactory />
        {contents.map((content) => (
          <Texts
            key={content.id}
            content={content}
            isOwner={content.creatorId === currentUser.uid}
          />
        ))}
      </StyledDiv>
    </>
  );
}

export default Home;
