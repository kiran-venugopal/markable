import React, { useState } from "react";
import { FaEllipsisV, FaExpand } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useHistory } from "react-router-dom";
import { ToastsStore } from "react-toasts";
import { AlignToRight, IconButton } from "../../utils/styles";

import DropDownMenu from "../DropDownMenu/DropDownMenu";
import NoteActions from "./NoteActions";

const NoteItem = ({ note }) => {
  const history = useHistory();
  const [isActionsVisible, setActions] = useState(false);

  const goToEditNote = () => {
    history.push(`/notes/edit/${note._id}`);
  };

  const toggleDropDown = () => setActions((prev) => !prev);

  return (
    <div style={{ height: "100%", padding: "3px" }}>
      <AlignToRight>
        <IconButton
          onClick={() =>
            ToastsStore.success("Under development!", null, "toast-element")
          }
        >
          <FaExpand size="15px" />
        </IconButton>
        <IconButton onClick={toggleDropDown}>
          <FaEllipsisV size="15px" />
        </IconButton>
      </AlignToRight>
      <DropDownMenu isOpen={isActionsVisible} onClose={toggleDropDown}>
        <NoteActions note={note} onEditClick={goToEditNote} />
      </DropDownMenu>
      <ReactQuill
        className="widget"
        containerPadding={[10, 20]}
        value={note.content}
        readOnly={true}
        theme="bubble"
        style={{ height: "90%" }}
      />
      {/* <Modal
        isOpen={isModalOpen}
        onRequestClose={toggleModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
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
      </Modal> */}
    </div>
  );
};

export default NoteItem;
