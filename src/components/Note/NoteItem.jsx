import React, { useState } from "react";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useHistory } from "react-router-dom";
import {
  AlignToRight,
  Button,
  IconButton,
  ModalActions,
  ModalDangerTitle,
  ModalQuillWrapper,
} from "../../utils/styles";
import Modal from "react-modal";
import useLocalStorage from "react-use-localstorage";
import { deleteNote } from "../../APIs/note";
import { ToastsStore } from "react-toasts";
import { useRecoilState, useSetRecoilState } from "recoil";
import { notesState, userState } from "../../recoil/atoms";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "white",
  },
  overlay: {
    background: "#000000ab",
  },
};

const NoteItem = ({ note }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const setNoteData = useSetRecoilState(notesState);
  const history = useHistory();
  const [userData] = useRecoilState(userState);

  console.log({ note });
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  const goToEditNote = () => {
    history.push(`edit-note/${note._id}`);
  };

  const deleteN = async (e) => {
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
  };

  return (
    <div style={{ height: "100%" }}>
      <AlignToRight>
        <IconButton onClick={goToEditNote}>
          <FaRegEdit />
        </IconButton>
        <IconButton
          onClick={(e) => {
            setIsOpen(true);
            stopPropagation(e);
          }}
        >
          <FaRegTrashAlt />
        </IconButton>
      </AlignToRight>
      <ReactQuill
        className="widget"
        containerPadding={[10, 20]}
        value={note.content}
        readOnly={true}
        theme="bubble"
        style={{ height: "90%" }}
      />

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <ModalDangerTitle> Are you sure to delete </ModalDangerTitle>
          <ModalQuillWrapper>
            <ReactQuill
              containerPadding={[10, 20]}
              value={note.content}
              readOnly={true}
              theme="bubble"
            />
          </ModalQuillWrapper>
          <ModalActions>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={deleteN} mode="danger">
              Delete
            </Button>
          </ModalActions>
        </div>
      </Modal>
    </div>
  );
};

export default NoteItem;
