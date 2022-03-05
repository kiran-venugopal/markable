import React from "react";
import { useSetRecoilState } from "recoil";
import {
  folderState,
  initialNoteDataType,
  notesState,
} from "../../../../recoil/atoms";
import { IFolder } from "../../../../types";
import DeleteView from "../../delete-view";

type PropsType = {
  folder: IFolder;
  onCancel(): void;
};

function DeleteFolder({ folder, onCancel }: PropsType) {
  const setFolderData = useSetRecoilState(folderState);
  const setNotesData = useSetRecoilState(notesState);

  const deleteFolder = () => {
    let noteIds: string[] = [];
    let newFolderData;
    let newNotesData;
    setFolderData((prev) => {
      noteIds = prev.folders.find((f) => f.id === folder.id)?.noteIds || [];
      newFolderData = {
        ...prev,
        folders: prev.folders.filter((f) => f.id !== folder.id),
      };
      return newFolderData;
    });
    setNotesData((prev) => {
      newNotesData = prev.notes.filter((note) => !noteIds.includes(note._id));
      return {
        ...prev,
        notes: newNotesData,
      };
    });

    window.localStorage.setItem("notes", JSON.stringify(newNotesData));
    window.localStorage.setItem("folders", JSON.stringify(newFolderData));
  };

  return (
    <DeleteView
      name={folder.name}
      onDelete={deleteFolder}
      type="Folder"
      onCancel={onCancel}
    />
  );
}

export default DeleteFolder;
