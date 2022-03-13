import { useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { updateNoteData } from "../APIs/note";
import { notesState, userState } from "../recoil/atoms";
import { INote } from "../types";

export default function useNoteUpdate() {
  const setNoteData = useSetRecoilState(notesState);
  const [userData] = useRecoilState(userState);
  const { isLoggedIn } = userData;
  const timerRef = useRef<NodeJS.Timeout>();

  function updateNote(note: Partial<INote>) {
    let newNotes: INote[] = [];
    let updatedNote: INote = {} as INote;
    setNoteData((prev) => {
      newNotes = prev.notes.map((n) => {
        if (n.id === note?.id) {
          updatedNote = {
            ...n,
            ...note,
            updatedAt: new Date().toISOString(),
          };
          return updatedNote;
        }
        return n;
      });
      return {
        ...prev,
        notes: newNotes,
      };
    });
    window.localStorage.setItem("notes", JSON.stringify(newNotes));
    if (timerRef.current) clearTimeout(timerRef.current);
    if (isLoggedIn)
      timerRef.current = setTimeout(() => {
        updateNoteData(updatedNote.id, updatedNote);
      }, 5000);
  }

  return updateNote;
}
