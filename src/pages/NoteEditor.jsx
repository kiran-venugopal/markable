import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useHistory, useParams } from "react-router-dom";
import { Button, NoteEditorContainer } from "../utils/styles";
import { ToolbarConfig } from "../utils/constants";
import { FaEdit, FaPlusSquare } from "react-icons/fa";
import { ToastsStore } from "react-toasts";
import { createNote, updateNote } from "../APIs/note";
import { useRecoilState } from "recoil";
import { notesState, userState } from "../recoil/atoms";

const NoteEditor = () => {
  const [note, setNote] = useState("");
  const { noteId } = useParams();
  console.log({ noteId });
  //const [isCreated, setIsCreated] = useState(noteId);
  //const [allNotesInString, setAllNotes] = useLocalStorage("notes");
  const [userData] = useRecoilState(userState);
  const [noteData] = useRecoilState(notesState);

  const history = useHistory();

  useEffect(() => {
    if (noteId) {
      let note = noteData.notes.find((note) => note._id === noteId);
      console.log({ note });
      if (!note) {
        history.push("/");
        return;
      }
      setNote(note.content);
    }
  }, []);

  const onNoteChange = (e) => {
    setNote(e);
  };

  async function create() {
    if (note.trim() !== "") {
      let req = {
        content: note,
        createdAt: new Date().toISOString(),
      };
      const res = await createNote(req, userData.token);
      if (res.success) {
        ToastsStore.success("Note created!", null, "toast-element");
        return;
      }
      ToastsStore.error(res.error, null, "toast-element");
      return;
    }
    ToastsStore.error("Note can't be empty", null, "toast-element");
  }

  async function update() {
    let noteUpdated = {
      content: note,
    };
    const res = await updateNote(noteId, noteUpdated, userData.token);
    if (res.success) {
      ToastsStore.success("Note updated!", null, "toast-element");
      return;
    }
    ToastsStore.error(res.error, null, "toast-element");
  }

  return (
    <NoteEditorContainer>
      <ReactQuill
        modules={{
          toolbar: ToolbarConfig,
        }}
        theme="snow"
        value={note}
        onChange={onNoteChange}
        style={{ height: "350px" }}
      />
      {noteId ? (
        <Button className="button" onClick={update}>
          <FaEdit className="icon" />
          <span className="text">Update Note</span>
        </Button>
      ) : (
        <Button onClick={create} className="button">
          <FaPlusSquare className="icon" />
          <span className="text">Create Note</span>
        </Button>
      )}
    </NoteEditorContainer>
  );
};

export default NoteEditor;
