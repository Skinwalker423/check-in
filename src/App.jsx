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
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Settings from "./pages/Settings";
import NewUsers from "./pages/Users";
import GlobalStyles from "./styles/GlobalStyles";
import CounterPage from "./pages/Counter";
import Booking from "./pages/Booking";
import CheckIn from "./pages/CheckIn";

import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";

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
      <ReactQueryDevtools initialIsOpen={true} />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
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
            <Route
              path='bookings/:bookingId'
              element={<Booking />}
            />
            <Route
              path='checkin/:bookingId'
              element={<CheckIn />}
            />

            <Route path='account' element={<Account />} />
            <Route path='settings' element={<Settings />} />
            <Route path='users' element={<NewUsers />} />
            <Route
              path='counter'
              element={<CounterPage />}
            />
          </Route>

          <Route path='login' element={<Login />} />

          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position='top-center'
        reverseOrder={false}
        gutter={12}
        containerStyle={{
          margin: "8px",
        }}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "var(--color-grey-0)",
            color: "var(--color-grey-700)",
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
          error: {
            duration: 7000,
            position: "top-right",
            theme: {
              primary: "red",
              secondary: "black",
            },
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
