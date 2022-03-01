import { IFolder } from "../../../types";
import { ReactComponent as FolderIcon } from "../../../icons/folder.svg";
import { ReactComponent as NewFileIcon } from "../../../icons/new.svg";
import File from "../file";
import "./folder.css";
import useNoteCreate from "../../../hooks/useNoteCreate";
import { Fragment } from "react";

type PropsType = {
  folder: IFolder;
  setDeleteNote(noteId: string): void;
};

export default function Folder({ folder, setDeleteNote }: PropsType) {
  const createNote = useNoteCreate();

  const handleClick = () => {
    createNote({ userId: "", name: "untitled", content: "" }, folder.id);
  };

  return (
    <Fragment>
      <div className="dir-item folder">
        <div className="icon">
          <FolderIcon width={18} height={18} />
        </div>
        {folder.name}
        <div className="actions">
          <button className="icon-button new-file" onClick={handleClick}>
            <NewFileIcon width={16} height={16} />
          </button>
        </div>
      </div>
      <div style={{ marginLeft: "25px" }}>
        {folder.noteIds.map((noteId) => (
          <File
            setDeleteNote={setDeleteNote}
            key={noteId}
            noteId={noteId}
            folderId={folder.id}
          />
        ))}
      </div>
    </Fragment>
  );
}
