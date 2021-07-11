import React, { useEffect } from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import NoteEditor from "../../pages/NoteEditor";
import AllNotes from "./AllNotes";
import { useSetRecoilState } from "recoil";
import { userState } from "../../recoil/atoms";
import { HomeRoutes } from "../../Routes";

function Notes() {
  const { url } = useRouteMatch();
  const setAccountData = useSetRecoilState(userState);

  useEffect(() => {
    const routeConfig = HomeRoutes.find((r) => r.path === url);
    setAccountData((prev) => ({
      ...prev,
      currentPathName: routeConfig.name,
    }));
  }, [url]);

  return (
    <Switch>
      <Route path={`${url}/add`}>
        <NoteEditor />
      </Route>
      <Route path={`${url}/edit/:noteId`}>
        <NoteEditor />
      </Route>
      <Route exact path={`${url}`}>
        <AllNotes />
      </Route>
    </Switch>
  );
}

export default Notes;
