import { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

import { db } from "../fbase";

import "./Texts.styles.scss";

import { RiDeleteBin6Line } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";

const Texts = ({ content, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(content.text);
  const contentRef = doc(db, "contents", `${content.id}`);

  const onDeleteClick = async () => {
    const ok = window.confirm("정말 삭제하시겠습니까?");
    if (ok) {
      await deleteDoc(contentRef);
    }
  };

  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await updateDoc(contentRef, { text: newText });
    setEditing(false);
  };

  const onChange = (e) => {
    setNewText(e.target.value);
  };

  return (
    <div className="texts-container">
      {editing ? (
        <>
          <form className="edit-form" onSubmit={onSubmit}>
            <input
              className="edit-input"
              type="text"
              placeholder="edit your content"
              value={newText}
              required
              onChange={onChange}
            />
            <div className="edit-buttons">
              <button className="update-button" type="submit" value="update">
                완료
              </button>
              <button className="cancel-button" onClick={toggleEditing}>
                취소
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <p>{content.text}</p>
          {isOwner && (
            <>
              <button className="edit-button" onClick={toggleEditing}>
                <GrEdit className='edit-button-svg' />
              </button>
              <button className="delete-button" onClick={onDeleteClick}>
                <RiDeleteBin6Line />
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Texts;
