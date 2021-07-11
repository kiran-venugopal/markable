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
  },
});

export const todosState = atom({
  key: "TODOS",
  default: {
    todos: [
      {
        _id: "1",
        title: "Tile of TODO1",
        description: "Description of the todo1",
        status: "open",
        createdOn: "timestr",
      },
      {
        _id: "2",
        title:
          "[0] - Collected Props: An object containing collected properties from the collect function. If no collectfunction is defined, an empty object is returned",
        description: "Description of the todo2",
        status: "open",
        createdOn: "timestr",
      },
      {
        _id: "3",
        title: "Tile of TODO3",
        description: "Description of the todo3",
        status: "open",
        createdOn: "timestr",
      },
      {
        _id: "4",
        title:
          "[0] - Collected Props: An object containing collected properties from the collect function. If no collectfunction is defined, an empty object is returned",
        description: "Description of the todo4",
        status: "inprogress",
        createdOn: "timestr",
      },
      {
        _id: "5",
        title: "Tile of TODO5",
        description: "Description of the todo5",
        status: "done",
        createdOn: "timestr",
      },
      {
        _id: "6",
        title: "Tile of TODO5",
        description: "Description of the todo5",
        status: "done",
        createdOn: "timestr",
      },
      {
        _id: "7",
        title:
          "An object containing collected properties from the collect function. If no collectfunction is defined, an empty object is returned",
        description: "Description of the todo5",
        status: "done",
        createdOn: "timestr",
      },
      {
        _id: "8",
        title:
          "Collected Props: An object containing collected properties from the collect function. If no collectfunction is defined, an empty object is returned",
        description: "Description of the todo5",
        status: "done",
        createdOn: "timestr",
      },
    ],
    isLoading: true,
  },
});
