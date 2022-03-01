import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import useNoteDelete from "../../../hooks/useNoteDelete";
import { notesState } from "../../../recoil/atoms";
import { INote } from "../../../types";
import "./delete-modal.css";

type PropsType = {
  onCancel(): void;
  deleteNoteMeta: { id: string; folderId?: string };
};

function DeleteModal({ onCancel, deleteNoteMeta }: PropsType) {
  const [notesData] = useRecoilState(notesState);
  const { notes } = notesData;
  const [note, setNote] = useState<INote>();
  const deleteNote = useNoteDelete();

  useEffect(() => {
    const note = notes.find((n) => n._id === deleteNoteMeta.id);
    setNote(note);
  }, []);

  const deleteNoteFile = () => {
    if (note?._id) deleteNote(note._id, deleteNoteMeta.folderId);

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
