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

type initialDataType = {
  notes: INote[];
  reload: boolean;
  isLoading: boolean;
  activeNote: string;
};

export const notesState = atom<initialDataType>({
  key: "NOTES",
  default: {
    notes: [
      {
        _id: "eerferf",
        content: "# Welcome to Notes and Todos",
        name: "test",
        userId: "",
      },
      {
        _id: "eerfeddrf",
        content: "# this is for  testing",
        name: "test2",
        userId: "",
      },
    ],
    reload: false,
    isLoading: true,
    activeNote: "",
  },
});

type folderDataType = {
  folders: IFolder[];
  noteIds: string[];
};

export const folderState = atom<folderDataType>({
  key: "FOLDER",
  default: {
    folders: [],
    noteIds: ["eerferf", "eerfeddrf"],
  },
});
