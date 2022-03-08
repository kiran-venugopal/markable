import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { fetchFolders, updateFolders } from "../APIs/folder";
import { fetchNotes, updateNoteData } from "../APIs/note";
import {
  folderDataType,
  folderState,
  notesState,
  userState,
} from "../recoil/atoms";
import { IFolder, INote } from "../types";

function useDBUpdater() {
  const [userData] = useRecoilState(userState);
  const setNotesData = useSetRecoilState(notesState);
  const setFolderData = useSetRecoilState(folderState);
  const { isLoggedIn } = userData;

  useEffect(() => {
    const syncUpWithDB = async () => {
      // downloading the notes from db
      const response = await fetchNotes();
      if (response.success) {
        const notesInDB = response.notes;
        let newNotes: INote[] = [];
        let notesNotInDB: INote[] = [];

        setNotesData((prev) => {
          const noteIDs = prev.notes.map((note) => note.id);
          const notesNotInLocal = notesInDB.filter(
            (note: INote) => !noteIDs.includes(note.id)
          );
          const dbNoteIds = notesInDB.map((note: INote) => note.id);
          notesNotInDB = prev.notes.filter(
            (note) => !dbNoteIds.includes(note.id)
          );

          newNotes = [...notesNotInLocal, ...prev.notes];
          return {
            ...prev,
            notes: newNotes,
          };
        });

        window.localStorage.setItem("notes", JSON.stringify(newNotes));
        // downloading the folder data from db
        const folderResponse = await fetchFolders();
        if (folderResponse.success) {
          let newFolderData: Partial<folderDataType> = {};
          const foldersInDB = folderResponse.folders || [];
          const fNotesInDB = folderResponse.noteIds || [];

          setFolderData((prev) => {
            const folderIds = prev.folders.map((folder) => folder.id);
            const foldersNotInLocal = foldersInDB.filter(
              (folder: IFolder) => !folderIds.includes(folder.id)
            );
            const noteIdsNotInLocal = fNotesInDB.filter(
              (nId: string) => !prev.noteIds.includes(nId)
            );

            newFolderData = {
              ...prev,
              folders: [...foldersNotInLocal, ...prev.folders],
              noteIds: [...noteIdsNotInLocal, ...prev.noteIds],
            };

            return newFolderData as folderDataType;
          });
          window.localStorage.setItem("folders", JSON.stringify(newFolderData));

          // updating the folders
          await updateFolders(newFolderData as folderDataType);

          // updating the notes those are not in db
          for (let i = 0; i < notesNotInDB.length; i++) {
            let note = notesNotInDB[i];
            await updateNoteData(note.id, note);
          }
        }
      }
    };

    if (isLoggedIn) syncUpWithDB();
  }, [isLoggedIn]);
}

export default useDBUpdater;
