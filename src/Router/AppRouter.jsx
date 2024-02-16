import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./../components/hooks/useAuth";

import Login from "./../components/pages/Login";
import Home from "./../components/pages/Home";
import Signup from "./../components/pages/Signup";
import NotAuth from "../components/pages/NotAuth";
import Details from "../components/pages/Details";
import FavoritePage from "../components/pages/Favorite";
import PageNotFound from "../components/pages/PageNotFound";

export const AppRouter = () => {
  const { isLogged } = useAuth();

  const NotAuthRouter = () => (
    <Routes>
      <Route path="/" element={<NotAuth />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );

  const AuthRouter = () => (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/details/:id" element={<Details />} />
      <Route path="/favorite" element={<FavoritePage />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );

  return isLogged ? <AuthRouter /> : <NotAuthRouter />;
};
