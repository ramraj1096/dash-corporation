import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import PokemonDetail from "./components/PokemonDetail";
import FavoritePage from "./pages/FavoritePage";
import ComparePage from "./pages/ComparePage";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
        <Route path="/favorites" element={<FavoritePage />} />
        <Route path="/compare" element={<ComparePage />} />
        {/* Catch-all route to redirect to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
