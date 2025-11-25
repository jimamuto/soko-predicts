import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.jsx";
import Navbar from "./assets/components/Navbar.jsx";
import Footer from "./assets/components/Footer.jsx";  
import ErrorBoundary from "./assets/components/ErrorBoundary.jsx";

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <div className="min-h-screen flex flex-col bg-white">
          <Navbar />
          <main className="flex-1">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;