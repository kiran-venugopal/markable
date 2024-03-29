import { useRecoilState, useSetRecoilState } from "recoil";
import { updateFolders } from "../APIs/folder";
import { updateNoteData } from "../APIs/note";
import {
  folderDataType,
  folderState,
  initialNoteDataType,
  notesState,
  userState,
} from "../recoil/atoms";
import { INote } from "../types";
import { uuidv4 } from "../utils/functions";

export default function useNoteCreate() {
  const setNoteData = useSetRecoilState(notesState);
  const setFolderData = useSetRecoilState(folderState);
  const [{ isLoggedIn }] = useRecoilState(userState);

  function createNote(note: Partial<INote>, folderId?: string) {
    const id = uuidv4();
    let newNotes: Partial<INote>[] = [],
      newFolderData: Partial<folderDataType> = {};

    setNoteData((prev) => {
      newNotes = [
        {
          ...note,
          id,
        },
        ...prev.notes,
      ];
      return {
        ...prev,
        notes: newNotes,
        activeNote: id,
      } as initialNoteDataType;
    });
    setFolderData((prev) => {
      if (typeof folderId === "string") {
        let newFolders = prev.folders.map((folder) => {
          if (folder.id === folderId) {
            return {
              ...folder,
              noteIds: [id, ...folder.noteIds],
              updatedAt: new Date().toISOString(),
            };
          }
          return folder;
        });
        newFolderData = {
          ...prev,
          folders: newFolders,
        };
      } else
        newFolderData = {
          ...prev,
          noteIds: [id, ...prev.noteIds],
        };
      return newFolderData as folderDataType;
    });

    window.localStorage.setItem("notes", JSON.stringify(newNotes));
    window.localStorage.setItem("folders", JSON.stringify(newFolderData));

    if (isLoggedIn) {
      updateFolders(newFolderData as folderDataType);
      updateNoteData(id, note);
    }
  }

  return createNote;
}
