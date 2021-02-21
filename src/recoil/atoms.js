import { atom } from "recoil";

export const userState = atom({
  key: "USER",
  default: {
    isLoggedIn: false,
    name: "",
    photo: "",
    token: "",
  },
});

export const notesState = atom({
  key: "NOTES",
  default: {
    notes: [],
    reload: false,
  },
});
