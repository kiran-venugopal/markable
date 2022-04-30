

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './components/Note/Notes' or it... Remove this comment to see the full error message
import Notes from "./components/Note/Notes";


// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './components/Todo/Todos' or it... Remove this comment to see the full error message
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
