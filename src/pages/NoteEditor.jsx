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
  const [isCreated, setIsCreated] = useState(noteId);
  //const [allNotesInString, setAllNotes] = useLocalStorage("notes");
  const [userData] = useRecoilState(userState);
  const [noteData] = useRecoilState(notesState);

  const history = useHistory();

  const updateOrCreate = () => {
    console.log({ isCreated });
    if (note.trim()) {
      if (isCreated) {
        update(false);
        return;
      }
      create(false);
    }
    return;
  };

  useEffect(() => {
    if (noteId) {
      let note = noteData.notes.find((note) => note._id === noteId);

      if (!note) {
        history.push("/");
        return;
      }
      setNote(note.content);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(updateOrCreate, 10000);

    return () => clearInterval(interval);
  }, [note, isCreated]);

  const onNoteChange = (e) => {
    setNote(e);
  };

  async function create(showToast = true) {
    if (note.trim() !== "") {
      let req = {
        content: note,
        createdAt: new Date().toISOString(),
      };
      const res = await createNote(req, userData.token);
      if (res.success) {
        if (showToast)
          ToastsStore.success("Note created!", null, "toast-element");
        setIsCreated(res.id);
        return;
      }
      if (showToast) ToastsStore.error(res.error, null, "toast-element");
      return;
    }
    if (showToast)
      ToastsStore.error("Note can't be empty", null, "toast-element");
  }

  async function update(showToast = true) {
    if (!note.trim()) {
      if (showToast) ToastsStore.success("Note can't be empty!");
    }
    let noteUpdated = {
      content: note,
    };
    const res = await updateNote(isCreated, noteUpdated, userData.token);
    if (res.success) {
      if (showToast)
        ToastsStore.success("Note updated!", null, "toast-element");
      return;
    }
    if (showToast) ToastsStore.error(res.error, null, "toast-element");
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
        className="widget-editor"
      />
      {isCreated ? (
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
