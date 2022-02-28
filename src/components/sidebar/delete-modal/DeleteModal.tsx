import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { folderState, notesState } from "../../../recoil/atoms";
import { INote } from "../../../types";
import { uuidv4 } from "../../../utils/functions";
import "./delete-modal.css";

type PropsType = {
  onCancel(): void;
  noteId: string;
};

function DeleteModal({ onCancel, noteId }: PropsType) {
  const [notesData, setNoteData] = useRecoilState(notesState);
  const setFolderData = useSetRecoilState(folderState);
  const { notes } = notesData;
  const [note, setNote] = useState<INote>();

  useEffect(() => {
    const note = notes.find((n) => n._id === noteId);
    setNote(note);
  }, []);

  const deleteNoteFile = () => {
    let newNoteId: string;
    setNoteData((prev) => {
      const notesAfterDeletion = prev.notes.filter((n) => note?._id !== n._id);

      let activeNote = notesAfterDeletion.length
        ? notesAfterDeletion[0]._id
        : "";
      if (prev.activeNote === note?._id) {
        if (prev.notes.length === 1) {
          const _id = uuidv4();
          const note = {
            _id,
            content: "",
            name: "untitled",
            userId: "",
          };
          notesAfterDeletion.push(note);
          activeNote = _id;
          newNoteId = _id;
        }
      }
      return {
        ...prev,
        notes: [...notesAfterDeletion],
        activeNote,
      };
    });
    setFolderData((prev) => {
      const noteIdsAfterDeletion = prev.noteIds.filter((n) => n !== noteId);
      if (newNoteId) noteIdsAfterDeletion.push(newNoteId);
      return {
        ...prev,
        noteIds: [...noteIdsAfterDeletion],
      };
    });
    onCancel();
  };

  return (
    <div className="delete-modal">
      <div className="title">
        Delete <strong>{note?.name}.md</strong>!
      </div>
      <div className="message">
        Do you really want to delete the file <i>{note?.name}.md</i> ? This
        process cannot be undone.
      </div>
      <div className="actions">
        <button onClick={onCancel} className="secondary">
          Cancel
        </button>
        <button onClick={deleteNoteFile} className="primary delete">
          Delete
        </button>
      </div>
    </div>
  );
}

export default DeleteModal;
