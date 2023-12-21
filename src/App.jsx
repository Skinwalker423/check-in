import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import NewUsers from "./pages/Users";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={<Navigate replace to={"dashboard"} />}
          index
        />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='cabins' element={<Cabins />} />
        <Route path='bookings' element={<Bookings />} />
        <Route path='account' element={<Account />} />
        <Route path='login' element={<Login />} />
        <Route path='settings' element={<Settings />} />
        <Route path='users' element={<NewUsers />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
