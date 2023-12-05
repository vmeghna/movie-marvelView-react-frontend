import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { UserProvider } from "./components/UserContext.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import HeroBanner from "./pages/home/heroBanner/HeroBanner.jsx";
import Home from "./pages/home/Home.jsx";
import Details from "./pages/details/Details.jsx";
import SearchResult from "./pages/searchResult/SearchResult.jsx";
import Explore from "./pages/explore/Explore.jsx";
import Login from "./components/Login.jsx";
import pageNotFound from "./pages/404/pageNotFound.jsx";
// import SignUp from "./components/SignUp.jsx";
import { useUser } from "./components/UserContext.jsx";
// import PrivateRoute from "./components/PrivateRoute.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<ProtectedRoute element={<HeroBanner />} />} />
      {/* <Route path="/" element={<PrivateRoute element={<HeroBanner />} />} /> */}
      {/* <Route path="/" element={<HeroBanner />} /> */}
      <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
      <Route
        path="/:mediaType/:id"
        element={<ProtectedRoute element={<Details />} />}
      />
      <Route
        path="/search/:query"
        element={<ProtectedRoute element={<SearchResult />} />}
      />
      <Route
        path="/explore/:mediaType"
        element={<ProtectedRoute element={<Explore />} />}
      />

      <Route path="/Login" element={<Login />} />
      {/* <Route path="/SignUp" element={<SignUp />} /> */}

      <Route path="*" element={<pageNotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </Provider>
  </React.StrictMode>
);

// <Route path="/" element={<App />}>
//   <Route path="/" element={<HeroBanner />} />
//   <Route path="/home" element={<Home />} />
//   <Route path="/:mediaType/:id" element={<Details />} />
//   <Route path="/search/:query" element={<SearchResult />} />
//   <Route path="/explore/:mediaType" element={<Explore />} />

//   <Route path="/search/:query" element={<SearchResult />} />

//   <Route path="/Login" element={<Login />} />
//   <Route path="/signup" element={<Signup />} />

//   <Route path="*" element={<PageNotFound />} />
// </Route>
