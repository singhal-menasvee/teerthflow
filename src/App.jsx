import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./components/ui/LandingPage";
import DashboardPage from "./pages/DashboardPage"; // Import your DashboardPage

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard/up" element={<DashboardPage state="Uttar Pradesh" />} />
        <Route path="/dashboard/tn" element={<DashboardPage state="Tamil Nadu" />} />
        <Route path="/dashboard/mh" element={<DashboardPage state="Maharashtra" />} />
        <Route path="/dashboard/gj" element={<DashboardPage state="Gujarat" />} />
        <Route path="/dashboard/rj" element={<DashboardPage state="Rajasthan" />} />
        {/* Add more routes for additional states */}
      </Routes>
    </Router>
  );
};

export default App;
