/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api";

import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import Login from "../src/components/Login.jsx";
import Signup from "./components/SignUp.jsx";
import { UserProvider } from "../src/components/UserContext.jsx";
import "./../src/index.css";
import HeroBanner from "./pages/home/heroBanner/HeroBanner.jsx";
// import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useUser } from "../src/components/UserContext.jsx";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);
  console.log(url);

  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      console.log(res);

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiConfiguration(url));
    });
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    console.log(data);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenres(allGenres));
  };

  const { userEmail } = useUser();

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;

//   return (
//     <BrowserRouter>
//       <UserProvider>
//         <Header />
//         <ToastContainer />
//         <Routes>
//           {userEmail ? (
//             <>
//               <Route path="/" element={<HeroBanner />} />
//               <Route path="/home" element={<Home />} />
//               <Route path="/:mediaType/:id" element={<Details />} />
//               <Route path="/search/:query" element={<SearchResult />} />
//               <Route path="/explore/:mediaType" element={<Explore />} />
//             </>
//           ) : (
//             <>
//               <Route path="/login" element={<Login />} />
//               <Route path="/" element={<ProtectedRoute />}>
//                 <Route path="/hero" element={<HeroBanner />} />
//                 <Route path="/" element={<Home />} />
//                 <Route path="/:mediaType/:id" element={<Details />} />
//                 <Route path="/search/:query" element={<SearchResult />} />
//                 <Route path="/explore/:mediaType" element={<Explore />} />
//               </Route>
//               <Route path="/signup" element={<Signup />} />
//               <Route path="*" element={<PageNotFound />} />
//             </>
//           )}

//           {/* <Route path="/login" element={<Login />} />
//           <Route path="/" element={<ProtectedRoute />}>
//             <Route path="/hero" element={<HeroBanner />} />
//             <Route path="/" element={<Home />} />

//             <Route path="/:mediaType/:id" element={<Details />} />
//             <Route path="/search/:query" element={<SearchResult />} />
//             <Route path="/explore/:mediaType" element={<Explore />} />
//           </Route>
//           <Route path="/signup" element={<Signup />} />
//           <Route path="*" element={<PageNotFound />} /> */}
//
