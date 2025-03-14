import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "./pages/admin/adminPage";
import HomePage from "./pages/home/homePage";
import Testing from "./assets/components/testing";

function App() {
  return (
    <BrowserRouter>
      <Routes path="/*">
        <Route path="/testing" element={<Testing />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
