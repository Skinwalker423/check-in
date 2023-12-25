import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import NewUsers from "./pages/Users";
import GlobalStyles from "./styles/GlobalStyles";
import AppLayout from "./ui/AppLayout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route
              element={
                <Navigate replace to={"dashboard"} />
              }
              index
            />
            <Route
              path='dashboard'
              element={<Dashboard />}
            />
            <Route path='cabins' element={<Cabins />} />
            <Route path='bookings' element={<Bookings />} />
            <Route path='account' element={<Account />} />
            <Route path='settings' element={<Settings />} />
            <Route path='users' element={<NewUsers />} />
          </Route>

          <Route path='login' element={<Login />} />

          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
