import React from "react";
import Notes from "../components/Note/Notes";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import NoteEditor from "./NoteEditor";

function HomePage() {
  let { path, url } = useRouteMatch();
  console.log({ path });

  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/notes" render={() => <Notes />} />
        <Route path="/todos" render={() => <div>todos</div>} />
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
