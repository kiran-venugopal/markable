import { ChangeEvent, Fragment, useState } from "react";
import { ReactComponent as Logo } from "../../icons/logo.svg";
import { ReactComponent as CopyIcon } from "../../icons/copy.svg";
import { ReactComponent as DoneIcon } from "../../icons/done.svg";
import "./navbar.css";
import { useRecoilState } from "recoil";
import { notesState } from "../../recoil/atoms";

type PropsType = {
  onMarkdownCopy(): void;
};

function Navbar({ onMarkdownCopy }: PropsType) {
  const [isCopied, setIsCopied] = useState(false);
  const [noteData, setNoteData] = useRecoilState(notesState);
  const [editMode, setEditMode] = useState(false);
  const { activeNote, notes } = noteData;
  const note = notes.find((note) => note._id === activeNote);

  const handleCopy = () => {
    setIsCopied(true);
    onMarkdownCopy();
    setTimeout(() => setIsCopied(false), 4000);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNoteData((prev) => ({
      ...prev,
      notes: [
        ...prev.notes.map((n) => {
          if (n._id === note?._id) {
            return {
              ...n,
              name: value,
            };
          }
          return n;
        }),
      ],
    }));
  };

  return (
    <div className="navbar">
      <div className="logo">
        <Logo width={25} height={25} />
      </div>
      <div className="file-name" onClick={() => setEditMode(true)}>
        {editMode ? (
          <input
            type="text"
            value={note?.name}
            autoFocus
            onBlur={() => setEditMode(false)}
            onChange={handleNameChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") setEditMode(false);
            }}
          />
        ) : (
          <Fragment>{note?.name}.md</Fragment>
        )}
      </div>
      <button onClick={handleCopy} className="primary">
        {isCopied ? (
          <Fragment>
            <div className="icon">
              <DoneIcon width={15} height={15} />
            </div>
            Copied
          </Fragment>
        ) : (
          <Fragment>
            <div className="icon">
              <CopyIcon width={11} height={11} />
            </div>
            Copy Markdown
          </Fragment>
        )}
      </button>
    </div>
  );
}

export default Navbar;
