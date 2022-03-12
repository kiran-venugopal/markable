import AuthSection from "./AuthSection";
import { useRecoilState } from "recoil";
import { folderDataType, folderState, userState } from "../../recoil/atoms";
import { ReactComponent as NewFileIcon } from "../../icons/new.svg";
import { ReactComponent as NewFolderIcon } from "../../icons/new-folder.svg";
import Modal from "../modal";
import { LegacyRef, MutableRefObject, useRef, useState } from "react";
import DeleteFile from "./file/delete-file";
import useNoteCreate from "../../hooks/useNoteCreate";
import File from "./file";
import { uuidv4 } from "../../utils/functions";
import Folder from "./folder";
import "./sidebar.css";
import useDBUpdater from "../../hooks/useDBUpdater";
import { updateFolders } from "../../APIs/folder";
import Resizer from "./resizer";

type deleteNoteDataType = {
  id: string;
  folderId?: string;
};

const initialDeleteNoteData = {
  id: "",
};

function Sidebar() {
  const [folderData, setFolderData] = useRecoilState(folderState);
  const [deleteNote, setDeleteNote] = useState<deleteNoteDataType>(
    initialDeleteNoteData
  );
  const [userData] = useRecoilState(userState);
  const createNote = useNoteCreate();
  useDBUpdater();
  const { noteIds, folders } = folderData;
  const { isLoggedIn } = userData;
  const siderbarRef = useRef<HTMLDivElement>();

  const handleSetDelete = (id: string, folderId?: string) => {
    setDeleteNote({ id, folderId });
  };

  const createNewFile = () => {
    createNote({ content: "", name: "untitled", userId: "" });
  };

  const createNewFolder = () => {
    let newFolderData = {} as folderDataType;
    setFolderData((prev) => {
      newFolderData = {
        ...prev,
        folders: [
          {
            id: uuidv4(),
            name: "Untitled",
            noteIds: [],
            folders: [],
          },
          ...prev.folders,
        ],
      };
      return newFolderData;
    });
    if (isLoggedIn) updateFolders(newFolderData);
  };

  const getWidth = () => {
    return parseInt(window.localStorage.getItem("sidebar-width") || "270");
  };

  return (
    <div
      style={{ width: `${getWidth()}px` }}
      className="sidebar"
      ref={siderbarRef as LegacyRef<HTMLDivElement>}
    >
      <div className="sidebar-actions">
        <button
          className="icon-button new-folder"
          title="new folder"
          onClick={createNewFolder}
        >
          <NewFolderIcon width={17} height={17} />
        </button>
        <button
          className="icon-button new-file"
          onClick={createNewFile}
          title="new file"
        >
          <NewFileIcon width={17} height={17} />
        </button>
      </div>
      <div className="folders">
        {folders.map((folder) => (
          <Folder
            key={folder.id}
            folder={folder}
            setDeleteNote={handleSetDelete}
          />
        ))}
        {noteIds.map((nid) => (
          <File key={nid} noteId={nid} setDeleteNote={handleSetDelete} />
        ))}
      </div>
      <AuthSection />
      <Modal
        isOpen={!!deleteNote.id}
        onClose={() => setDeleteNote(initialDeleteNoteData)}
      >
        <DeleteFile
          onCancel={() => setDeleteNote({ id: "" })}
          deleteNoteMeta={deleteNote}
        />
      </Modal>
      <Resizer elementRef={siderbarRef as MutableRefObject<HTMLDivElement>} />
    </div>
  );
}

export default Sidebar;
