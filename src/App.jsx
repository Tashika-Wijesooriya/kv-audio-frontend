import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "./pages/admin/adminPage";
import HomePage from "./pages/home/homePage";
import Testing from "./assets/components/testing";
import LoginPage from "./pages/login/login";

function App() {
  return (
    <BrowserRouter>
      <Routes path="/*">
        <Route path="/testing" element={<Testing />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
