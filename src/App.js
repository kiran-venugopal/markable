import "./App.css";
import { BrowserRouter, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { useRecoilState } from "recoil";
import { userState } from "./recoil/atoms";
import GuardedRoute from "./utils/RouteGuard";
import loginPage from "./pages/LoginPage";
import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore,
} from "react-toasts";

function App() {
  const [userData] = useRecoilState(userState);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <GuardedRoute path="/login" component={loginPage} exact />
          <GuardedRoute
            path="/"
            component={HomePage}
            isAuthenticated={userData.isLoggedIn}
            authorizedOnly={true}
            redirectPath="/login"
          />
        </Switch>
      </BrowserRouter>
      <ToastsContainer
        position={ToastsContainerPosition.BOTTOM_CENTER}
        store={ToastsStore}
      />
    </div>
  );
}

export default App;
