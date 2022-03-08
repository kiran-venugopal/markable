import AuthSection from "./AuthSection";
import { useRecoilState } from "recoil";
import { folderDataType, folderState, userState } from "../../recoil/atoms";
import { ReactComponent as NewFileIcon } from "../../icons/new.svg";
import { ReactComponent as NewFolderIcon } from "../../icons/new-folder.svg";
import { ReactComponent as FolderIcon } from "../../icons/folder.svg";
import Modal from "../modal";
import { useState } from "react";
import DeleteFile from "./file/delete-file";
import useNoteCreate from "../../hooks/useNoteCreate";
import File from "./file";
import { uuidv4 } from "../../utils/functions";
import Folder from "./folder";
import "./sidebar.css";
import useDBUpdater from "../../hooks/useDBUpdater";
import { updateFolders } from "../../APIs/folder";

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

  return (
    <div className="sidebar">
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
    </div>
  );
}

export default Sidebar;
