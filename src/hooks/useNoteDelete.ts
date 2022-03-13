import { useRecoilState, useSetRecoilState } from "recoil";
import { updateFolders } from "../APIs/folder";
import { deleteNoteData } from "../APIs/note";
import {
  folderDataType,
  folderState,
  notesState,
  userState,
} from "../recoil/atoms";
import { INote } from "../types";
import { uuidv4 } from "../utils/functions";

export default function useNoteDelete() {
  const setNoteData = useSetRecoilState(notesState);
  const setFolderData = useSetRecoilState(folderState);
  const [userData] = useRecoilState(userState);
  const { isLoggedIn } = userData;

  function deleteNote(noteId: string, folderId?: string) {
    let notesAfterDeletion: INote[] = [];
    let newFolderData = {};
    let newNoteId = "";

    console.log({ noteId, folderId });

    setNoteData((prev) => {
      notesAfterDeletion = prev.notes.filter((n) => noteId !== n.id);

      let activeNote = notesAfterDeletion.length
        ? notesAfterDeletion[0].id
        : "";
      if (prev.activeNote === noteId) {
        if (prev.notes.length === 1) {
          const id = uuidv4();
          const note = {
            id,
            content: "",
            name: "untitled",
            userId: "",
            updatedAt: new Date().toISOString(),
          };
          notesAfterDeletion.push(note);
          activeNote = id;
          newNoteId = id;
        }
      }
      return {
        ...prev,
        notes: [...notesAfterDeletion],
        activeNote,
      };
    });
    setFolderData((prev) => {
      if (folderId) {
        const updatedFolders = prev.folders.map((folder) => {
          if (folder.id === folderId) {
            return {
              ...folder,
              noteIds: [...folder.noteIds.filter((nId) => nId !== noteId)],
            };
          }
          return folder;
        });
        if (newNoteId) {
          newFolderData = {
            ...prev,
            folders: updatedFolders,
            noteIds: [newNoteId, ...prev.noteIds],
          };
        } else
          newFolderData = {
            ...prev,
            folders: updatedFolders,
          };
      } else {
        const noteIdsAfterDeletion = prev.noteIds.filter((n) => n !== noteId);
        if (newNoteId) noteIdsAfterDeletion.unshift(newNoteId);
        newFolderData = {
          ...prev,
          noteIds: [...noteIdsAfterDeletion],
        };
      }
      return newFolderData as folderDataType;
    });

    window.localStorage.setItem("notes", JSON.stringify(notesAfterDeletion));
    window.localStorage.setItem("folders", JSON.stringify(newFolderData));
    if (isLoggedIn) {
      updateFolders(newFolderData as folderDataType).then(() => {});
      deleteNoteData(noteId).then(() => {});
    }
  }

  return deleteNote;
}
