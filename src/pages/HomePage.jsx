import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { HomeRoutes } from "../Routes";

function HomePage() {
  return (
    <div className="content-wrapper">
      <Navbar />
      <div style={{ background: "whitesmoke", flexGrow: "1" }}>
        <Switch>
          {HomeRoutes.map((routeConfig) => (
            <Route {...routeConfig} />
          ))}
        </Switch>
      </div>
    </div>
  );
}

export default HomePage;
