import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import useNoteDelete from "../../../../hooks/useNoteDelete";
import { notesState } from "../../../../recoil/atoms";
import { INote } from "../../../../types";
import DeleteView from "../../delete-view/DeleteView";
import "./delete-file.css";

type PropsType = {
  onCancel(): void;
  deleteNoteMeta: { id: string; folderId?: string };
};

function DeleteFile({ onCancel, deleteNoteMeta }: PropsType) {
  const [notesData] = useRecoilState(notesState);
  const { notes } = notesData;
  const [note, setNote] = useState<INote>();
  const deleteNote = useNoteDelete();

  useEffect(() => {
    const note = notes.find((n) => n.id === deleteNoteMeta.id);
    setNote(note);
  }, []);

  const deleteNoteFile = () => {
    if (note?.id) deleteNote(note.id, deleteNoteMeta.folderId);

    onCancel();
  };

  return (
    <DeleteView
      onDelete={deleteNoteFile}
      onCancel={onCancel}
      name={note?.name || ""}
    />
  );
}

export default DeleteFile;
