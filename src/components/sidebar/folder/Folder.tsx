import { IFolder } from "../../../types";
import { ReactComponent as FolderIcon } from "../../../icons/folder.svg";
import { ReactComponent as FolderOpenIcon } from "../../../icons/folder-open.svg";
import { ReactComponent as NewFileIcon } from "../../../icons/new.svg";
import { ReactComponent as RemoveIcon } from "../../../icons/remove.svg";
import File from "../file";
import "./folder.css";
import useNoteCreate from "../../../hooks/useNoteCreate";
import {
  ChangeEvent,
  Fragment,
  KeyboardEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { folderDataType, folderState, notesState } from "../../../recoil/atoms";
import Modal from "../../modal";
import DeleteFolder from "./delete-folder";
import { updateFolders } from "../../../APIs/folder";

type PropsType = {
  folder: IFolder;
  setDeleteNote(noteId: string): void;
  enableEdit?: boolean;
};

export default function Folder({
  folder,
  setDeleteNote,
  enableEdit = false,
}: PropsType) {
  const createNote = useNoteCreate();
  const [editMode, setEditMode] = useState(enableEdit);
  const setFolderData = useSetRecoilState(folderState);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteFolder, setDeleteFolder] = useState<IFolder>();
  const [noteData] = useRecoilState(notesState);
  const { activeNote } = noteData;
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (folder.noteIds.includes(activeNote)) {
      setIsOpen(true);
    }
  }, [activeNote]);

  const handleClick: MouseEventHandler = (e) => {
    e.stopPropagation();
    setIsOpen(true);
    createNote({ userId: "", name: "untitled", content: "" }, folder.id);
  };

  const onFolderClick: MouseEventHandler = (e) => {
    e.stopPropagation();
    setEditMode(true);
  };

  const onFolderNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    changeFolderName(value);
  };

  const changeFolderName = (newName: string) => {
    let folderData = {} as folderDataType;
    setFolderData((prev) => {
      folderData = {
        ...prev,
        folders: prev.folders.map((f) =>
          f.id === folder.id ? { ...f, name: newName } : f
        ),
      };
      return folderData;
    });
    window.localStorage.setItem("folders", JSON.stringify(folderData));
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      updateFolders(folderData);
    }, 5000);
  };

  const handleEmptyName = (eventTarget: EventTarget) => {
    const target = eventTarget as HTMLInputElement;
    const { value } = target;
    if (!value.trim()) {
      changeFolderName("Untitled");
    }
    setEditMode(false);
  };

  const handleFolderClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleDeleteClick = (folder: IFolder) => {
    setDeleteFolder(folder);
  };

  return (
    <Fragment>
      <div className="dir-item folder" onClick={handleFolderClick}>
        <div className="icon">
          {isOpen ? (
            <FolderOpenIcon width={18} height={18} />
          ) : (
            <FolderIcon width={18} height={18} />
          )}
        </div>
        {editMode ? (
          <input
            className="edit-name"
            autoFocus={true}
            value={folder.name}
            onFocus={(e) => e.target.select()}
            onChange={onFolderNameChange}
            onBlur={(e) => handleEmptyName(e.target)}
            onKeyDown={(e) => e.key === "Enter" && handleEmptyName(e.target)}
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <div onClick={onFolderClick}>{folder.name}</div>
        )}
        <div className="actions">
          <button className="icon-button new-file" onClick={handleClick}>
            <NewFileIcon width={16} height={16} />
          </button>
          <button
            style={{ marginLeft: "8px" }}
            className="icon-button new-file"
            onClick={() => handleDeleteClick(folder)}
          >
            <RemoveIcon width={16} height={16} />
          </button>
        </div>
      </div>
      <div
        style={{ marginLeft: "25px", height: isOpen ? "auto" : "0px" }}
        className="folder-files"
      >
        {folder.noteIds.map((noteId) => (
          <File
            setDeleteNote={setDeleteNote}
            key={noteId}
            noteId={noteId}
            folderId={folder.id}
          />
        ))}
      </div>
      <Modal isOpen={!!deleteFolder} onClose={() => setDeleteFolder(undefined)}>
        <DeleteFolder
          folder={deleteFolder as IFolder}
          onCancel={() => setDeleteFolder(undefined)}
        />
      </Modal>
    </Fragment>
  );
}
