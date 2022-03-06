import { useRecoilState } from "recoil";
import { notesState } from "../../../recoil/atoms";
import { ReactComponent as MDIcon } from "../../../icons/md.svg";
import { ReactComponent as RemoveIcon } from "../../../icons/remove.svg";
import { useEffect, useState } from "react";
import { INote } from "../../../types";

type PropsType = {
  noteId: string;
  setDeleteNote(noteId: string, folderId?: string): void;
  folderId?: string;
};

function File({ noteId, setDeleteNote, folderId }: PropsType) {
  const [noteData, setNoteData] = useRecoilState(notesState);
  const { activeNote, notes } = noteData;
  const [note, setNote] = useState<INote>();

  useEffect(() => {
    const note = notes.find((n) => n.id === noteId);
    setNote(note);
  }, [noteId, notes]);

  const handleFileClick = (noteId: string) => () =>
    setNoteData((prev) => ({ ...prev, activeNote: noteId }));

  return (
    <div
      onClick={handleFileClick(noteId)}
      className={`dir-item ${activeNote === noteId && "active"}`}
    >
      <div className="icon">
        <MDIcon width={20} height={20} />
      </div>
      {note?.name}.md
      <div className="actions">
        <button
          className="icon-button"
          onClick={() => setDeleteNote(noteId, folderId)}
        >
          <RemoveIcon width={18} height={18} />
        </button>
      </div>
    </div>
  );
}

export default File;
