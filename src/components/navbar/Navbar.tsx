import { ChangeEvent, Fragment, useState } from "react";
import { ReactComponent as Logo } from "../../icons/logo.svg";
import { ReactComponent as CopyIcon } from "../../icons/copy.svg";
import { ReactComponent as DoneIcon } from "../../icons/done.svg";
import "./navbar.css";
import { useRecoilState } from "recoil";
import { notesState } from "../../recoil/atoms";
import useNoteUpdate from "../../hooks/useNoteUpdate";

function Navbar() {
  const [isCopied, setIsCopied] = useState(false);
  const [noteData, setNoteData] = useRecoilState(notesState);
  const [editMode, setEditMode] = useState(false);
  const updateNote = useNoteUpdate();
  const { activeNote, notes } = noteData;
  const note = notes.find((note) => note.id === activeNote);

  const handleCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(note?.content.replace(/\\/g, "") || "");
    setTimeout(() => setIsCopied(false), 4000);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateNote({ id: note?.id, name: value });
  };

  const handleAfterRename = () => {
    setEditMode(false);
    if (!note?.name.trim()) {
      updateNote({ id: note?.id, name: "untitled" });
    }
  };

  return (
    <div className="navbar">
      <div className="logo">
        <Logo width={25} height={25} />
      </div>
      {note?.id && (
        <div
          data-testid="file-name-label"
          className="file-name"
          onClick={() => setEditMode(true)}
        >
          {editMode ? (
            <input
              type="text"
              className="edit-name"
              data-testid="file-name-input"
              value={note?.name}
              autoFocus
              onFocus={(e) => e.target.select()}
              onBlur={handleAfterRename}
              onChange={handleNameChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAfterRename();
              }}
            />
          ) : (
            <Fragment>{note?.name}.md</Fragment>
          )}
        </div>
      )}
      <button onClick={handleCopy} className="primary">
        {isCopied ? (
          <Fragment>
            <div className="icon">
              <DoneIcon width={15} height={15} />
            </div>
            <div className="label">Copied</div>
          </Fragment>
        ) : (
          <Fragment>
            <div className="icon">
              <CopyIcon width={11} height={11} />
            </div>
            <div className="label">Copy Markdown</div>
          </Fragment>
        )}
      </button>
    </div>
  );
}

export default Navbar;
