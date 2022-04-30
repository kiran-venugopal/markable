import Notes from "./components/Note/Notes";
import Todos from "./components/Todo/Todos";

export const HomeRoutes = [
  {
    path: "/notes",
    name: "notes",
    component: Notes,
  },
  {
    path: "/todos",
    name: "todos",
    component: Todos,
  },
  {
    path: "/",
    name: "notes",
    component: Notes,
  },
];
