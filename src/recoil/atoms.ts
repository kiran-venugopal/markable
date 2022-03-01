import { atom } from "recoil";
import { IFolder, INote } from "../types";

export const userState = atom({
  key: "USER",
  default: {
    isLoggedIn: false,
    name: "",
    photo: "",
    token: "",
    email: "",
    currentPathName: "notes",
  },
});

export type initialNoteDataType = {
  notes: INote[];
  reload: boolean;
  isLoading: boolean;
  activeNote: string;
};

export const notesState = atom<initialNoteDataType>({
  key: "NOTES",
  default: {
    notes: JSON.parse(window.localStorage.getItem("notes") || "[]"),
    reload: false,
    isLoading: true,
    activeNote: "",
  },
});

export type folderDataType = {
  folders: IFolder[];
  noteIds: string[];
};

const initialFolderData = {
  folders: [],
  noteIds: [],
};

export const folderState = atom<folderDataType>({
  key: "FOLDER",
  default:
    JSON.parse(window.localStorage.getItem("folders") || "false") ||
    initialFolderData,
});
