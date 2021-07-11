import React from "react";
import { Switch, Route } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { HomeRoutes } from "../Routes";

function HomePage() {
  return (
    <div className="content-wrapper">
      <Navbar />
      <Switch>
        {HomeRoutes.map((routeConfig) => (
          <Route {...routeConfig} />
        ))}
      </Switch>
    </div>
  );
}

export default HomePage;
