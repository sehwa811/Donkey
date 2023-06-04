import { useState, useEffect, useContext } from "react";

import { collection, onSnapshot, query } from "firebase/firestore";

import { db } from "../fbase";
import Texts from "../components/Texts";

import styled from "styled-components";
import { UserContext } from "../contexts/usercontext";

const StyledDiv = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 400px) {
    grid-column: 1 / 3;
  }
`;

const MyContents = () => {
  const { currentUser } = useContext(UserContext);
  //const { currentUser } = useContext(UserContext);
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
  
  return (
    <StyledDiv>
      {contents
        .filter((content) => content.creatorId === currentUser.uid)
        .map((content) => (
          <Texts
            key={content.id}
            content={content}
            isOwner={content.creatorId === currentUser.uid}
          />
        ))}
    </StyledDiv>
  );
};

export default MyContents;
