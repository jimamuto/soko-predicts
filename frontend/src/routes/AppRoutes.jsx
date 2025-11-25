import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../assets/pages/Home.jsx";
import GeneratePrediction from "../assets/pages/GeneratePrediction.jsx";
import PredictionsHistory from "../assets/pages/PredictionsHistory.jsx";
import About from "../assets/pages/About.jsx";
import NotFound from "../assets/pages/NotFound.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/predict" element={<GeneratePrediction />} />
      <Route path="/history" element={<PredictionsHistory />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;