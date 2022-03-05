import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import useNoteDelete from "../../../../hooks/useNoteDelete";
import { notesState } from "../../../../recoil/atoms";
import { INote } from "../../../../types";
import DeleteView from "../../delete-view";

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
    const note = notes.find((n) => n._id === deleteNoteMeta.id);
    setNote(note);
  }, []);

  const deleteNoteFile = () => {
    if (note?._id) deleteNote(note._id, deleteNoteMeta.folderId);

    onCancel();
  };

  return (
    <DeleteView
      onDelete={deleteNoteFile}
      name={`${note?.name}.md`}
      onCancel={onCancel}
    />
  );
}

export default DeleteFile;
