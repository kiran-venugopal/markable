import React from "react";
import Notes from "../components/Note/Notes";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import NoteEditor from "./NoteEditor";
import Todos from "../components/Todo/Todos";

function HomePage() {
  return (
    <div className="content-wrapper">
      <Navbar />
      <Switch>
        <Route path="/notes" render={() => <Notes />} />
        <Route path="/todos" render={() => <Todos />} />
        <Route path="/add-note" render={() => <NoteEditor />} />
        <Route path="/edit-note/:noteId" render={() => <NoteEditor />} />
        <Route path="/">
          <div>
            <div style={{ padding: "10px" }}>
              <Notes />
            </div>
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default HomePage;
