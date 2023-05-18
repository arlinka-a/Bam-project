import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import NewRequestPage from './pages/NewRequestPage';
import MyRequestsPage from './pages/MyRequestsPage';
import ManagerPage from './pages/manager/ManagerPage';
import { useContext } from "react";
import AuthContext from "./context/auth-context";
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs'

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        <Route path="/myRequests">
          <Route path="/myRequests/:kind">
            <NewRequestPage/>
          </Route>
          <MyRequestsPage/>
          </Route>
        <Route path="/profile">
          {authCtx.isLoggedIn && <UserProfile />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>
        <Route path="/manageRequests">
          {authCtx.isLoggedIn && <ManagerPage />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
    </LocalizationProvider>
  );
}

export default App;
