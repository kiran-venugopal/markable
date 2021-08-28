import React, { useState } from "react";
import { Fragment } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ToastsStore } from "react-toasts";
import { useRecoilState, useSetRecoilState } from "recoil";
import { deleteNote } from "../../APIs/note";
import { notesState, userState } from "../../recoil/atoms";
import { Spinner } from "../../styled-components";

//css is used from dropdown componwnt
function NoteActions({ onEditClick = () => {}, note = {} }) {
  const [userData] = useRecoilState(userState);
  const setNoteData = useSetRecoilState(notesState);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteN = async () => {
    setIsDeleting(true);
    const res = await deleteNote(note._id, userData.token);
    if (res.success) {
      ToastsStore.success("Note deleted!", null, "toast-element");
      setNoteData((prev) => ({
        ...prev,
        reload: true,
      }));
      return;
    }
    ToastsStore.error(res.error, null, "toast-element");
    setIsDeleting(false);
  };

  return (
    <Fragment>
      <div className="menu-item pointer" onClick={onEditClick}>
        <div className="icon">
          <FaEdit />
        </div>
        <div className="text">Edit</div>
      </div>
      <div className="menu-item pointer">
        <div className="icon">{isDeleting ? <Spinner /> : <FaTrash />}</div>
        <div onClick={deleteN} className="text">
          Delete
        </div>
      </div>
    </Fragment>
  );
}

export default NoteActions;
