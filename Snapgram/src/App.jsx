import React from "react";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import Layout from "./Components/Layout/Layout";
import "react-toastify/dist/ReactToastify.css";
import NotLogin from "../Middleware/NotLogin";
import Loggedin from "../Middleware/Loggedin";
import Home from "./Pages/Home/Home";
import Explore from "./Pages/Explore/Explore";
import People from "./Pages/People/People";
import Save from "./Pages/Save/Save";
import Create from "./Pages/Create/Create";
import Profile from "./Pages/Profile/Profile";
import UpdateProfile from "./Pages/UpdateProfile/UpdateProfile";
import Post from "./Pages/Post/Post";
import UpdatePost from "./Pages/UpdatePost/UpdatePost";

const client = new QueryClient();
export default function App() {
  const cookie = document.cookie;
  if (!cookie) {
    localStorage.removeItem("user");
  }

  return (
    <>
      <main>
        <ToastContainer theme="dark" />
        <QueryClientProvider client={client}>
          <Routes>
            <Route
              path="/"
              element={
                <Loggedin>
                  <Login />
                </Loggedin>
              }
            />
            <Route
              path="/Sign-up"
              element={
                <Loggedin>
                  <Signup />
                </Loggedin>
              }
            />
          </Routes>

          <Routes>
            <Route
              path="/Deshboard"
              element={
                <NotLogin>
                  <Layout />
                </NotLogin>
              }
            >
              <Route index="/Deshboard" element={<Home />} />
              <Route path="/Deshboard/Profile/:id" element={<Profile />} />
              <Route path="/Deshboard/Explore" element={<Explore />} />
              <Route path="/Deshboard/People" element={<People />} />
              <Route path="/Deshboard/Save" element={<Save />} />
              <Route path="/Deshboard/Create" element={<Create />} />
              <Route path="/Deshboard/Post/:id" element={<Post />} />
              <Route
                path="/Deshboard/Update-Profile/:id"
                element={<UpdateProfile />}
              />
              <Route path="/Deshboard/UpdatePost" element={<UpdatePost />} />
            </Route>
          </Routes>
        </QueryClientProvider>
      </main>
    </>
  );
}
