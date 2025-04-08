import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "./pages/admin/adminPage";
import HomePage from "./pages/home/homePage";
import Testing from "./assets/components/testing";
import LoginPage from "./pages/login/login";
import toast, { Toaster } from "react-hot-toast";
import RegisterPage from "./pages/register/register";
import { GoogleOAuthProvider } from "@react-oauth/google";



function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes path="/*">
          <Route path="/testing" element={<Testing />} />
          <Route path="/admin/*" element={<AdminPage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
