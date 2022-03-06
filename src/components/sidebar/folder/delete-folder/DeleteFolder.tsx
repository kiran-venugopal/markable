import { useSetRecoilState } from "recoil";
import { folderState, notesState } from "../../../../recoil/atoms";
import { IFolder, INote } from "../../../../types";
import DeleteView from "../../delete-view/DeleteView";

type PropsType = {
  folder: IFolder;
  onCancel(): void;
};

function DeleteFolder({ folder, onCancel }: PropsType) {
  const setFolderData = useSetRecoilState(folderState);
  const setNotesData = useSetRecoilState(notesState);

  const hanldeDelete = () => {
    let newFolderData;
    let removedNoteIds: string[] = [];
    let newNotes: INote[] = [];
    setFolderData((prev) => {
      let removedFolder = prev.folders.find((f) => f.id === folder.id);
      removedNoteIds = removedFolder?.noteIds || [];

      newFolderData = {
        ...prev,
        folders: prev.folders.filter((f) => f.id !== folder.id),
      };
      return newFolderData;
    });
    setNotesData((prev) => {
      newNotes = prev.notes.filter((note) => !removedNoteIds.includes(note.id));
      return {
        ...prev,
        notes: newNotes,
      };
    });
    window.localStorage.setItem("notes", JSON.stringify(newNotes));
    window.localStorage.setItem("folders", JSON.stringify(newFolderData));
  };

  return (
    <DeleteView
      onDelete={hanldeDelete}
      onCancel={onCancel}
      name={folder.name}
      type="Folder"
    />
  );
}

export default DeleteFolder;
