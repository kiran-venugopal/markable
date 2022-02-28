import "./sidebar.css";
import AuthSection from "./AuthSection";
import { useRecoilState } from "recoil";
import { folderState, notesState } from "../../recoil/atoms";
import { ReactComponent as MDIcon } from "../../icons/md.svg";
import { ReactComponent as NewFileIcon } from "../../icons/new.svg";
import { ReactComponent as RemoveIcon } from "../../icons/remove.svg";
import { uuidv4 } from "../../utils/functions";
import Modal from "../modal";
import { useState } from "react";
import DeleteModal from "./delete-modal/DeleteModal";

function Sidebar() {
  const [folderData, setFolderData] = useRecoilState(folderState);
  const [noteData, setNoteData] = useRecoilState(notesState);
  const [deleteNote, setDeleteNote] = useState("");
  const { notes, activeNote } = noteData;
  const { noteIds } = folderData;
  console.log({ folderData });

  const handleFileClick = (noteId: string) => () =>
    setNoteData((prev) => ({ ...prev, activeNote: noteId }));

  const createNewFile = () => {
    const _id = uuidv4();
    setNoteData((prev) => ({
      ...prev,
      notes: [
        ...prev.notes,
        {
          _id,
          content: "",
          name: "untitled",
          userId: "",
        },
      ],
      activeNote: _id,
    }));

    setFolderData((prev) => ({
      ...prev,
      noteIds: [...prev.noteIds, _id],
    }));
  };

  return (
    <div className="sidebar">
      <div className="sidebar-actions">
        <button
          className="icon-button"
          onClick={createNewFile}
          title="new file"
        >
          <NewFileIcon width={17} height={17} />
        </button>
      </div>
      <div className="folders">
        {noteIds.map((nid) => (
          <div
            onClick={handleFileClick(nid)}
            className={`file-item ${activeNote === nid && "active"}`}
            key={nid}
          >
            <div className="icon">
              <MDIcon width={20} height={20} />
            </div>
            {notes.find((n) => n._id === nid)?.name}.md
            <div className="actions">
              <button
                className="icon-button"
                onClick={() => setDeleteNote(nid)}
              >
                <RemoveIcon width={18} height={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <AuthSection />
      <Modal isOpen={!!deleteNote} onClose={() => setDeleteNote("")}>
        <DeleteModal onCancel={() => setDeleteNote("")} noteId={deleteNote} />
      </Modal>
    </div>
  );
}

export default Sidebar;
