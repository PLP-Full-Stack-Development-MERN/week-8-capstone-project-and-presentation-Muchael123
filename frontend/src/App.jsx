import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CreateStoryPage from "./pages/CreateStoryPage";
import ExplorePage from "./pages/ExplorePage";
import ContactPage from "./pages/ContactPage";
import DashboardPage from "./pages/DashboardPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { AuthProvider } from "./context/authContext";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import ConfirmEmail from "./pages/ConfirmEmail";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#cad3ff] flex flex-col">
          <Navbar />
          <ToastContainer />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/contact-us" element={<ContactPage />} />
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/confirm-email" element={<ConfirmEmail />} />

              <Route element={<PrivateRoute />}>
                <Route path="/create-story" element={<CreateStoryPage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/dashboard" element={<DashboardPage />} />

              </Route>
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
