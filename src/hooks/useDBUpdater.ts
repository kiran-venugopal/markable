import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { fetchNotes } from "../APIs/note";
import { notesState, userState } from "../recoil/atoms";
import { INote } from "../types";

function useDBUpdater() {
  const [userData] = useRecoilState(userState);
  const setNotesData = useSetRecoilState(notesState);
  const { isLoggedIn } = userData;

  useEffect(() => {
    const getNotes = async () => {
      const response = await fetchNotes(userData.token);
      if (response.success) {
        const notesInDB = response.notes;
        let newNotes: INote[] = [];
        setNotesData((prev) => {
          const noteIDs = prev.notes.map((note) => note._id);
          const notesNotInLocal = notesInDB.filter(
            (note: INote) => !noteIDs.includes(note._id)
          );

          newNotes = [...notesNotInLocal, ...prev.notes];
          return {
            ...prev,
            notes: newNotes,
          };
        });
      }
    };
    if (isLoggedIn) getNotes();
  }, [isLoggedIn]);
}

export default useDBUpdater;
