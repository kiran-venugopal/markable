import { atom } from "recoil";

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

export const notesState = atom({
  key: "NOTES",
  default: {
    notes: [],
    reload: false,
    isLoading: true,
    activeNote: "",
  },
});
