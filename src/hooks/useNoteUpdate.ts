import { useSetRecoilState } from "recoil";
import { notesState } from "../recoil/atoms";
import { INote } from "../types";

export default function useNoteUpdate() {
  const setNoteData = useSetRecoilState(notesState);

  function updateNote(note: Partial<INote>) {
    let newNotes: INote[] = [];
    setNoteData((prev) => {
      newNotes = prev.notes.map((n) => {
        if (n.id === note?.id) {
          return {
            ...n,
            ...note,
          };
        }
        return n;
      });
      return {
        ...prev,
        notes: newNotes,
      };
    });
    window.localStorage.setItem("notes", JSON.stringify(newNotes));
  }

  return updateNote;
}
