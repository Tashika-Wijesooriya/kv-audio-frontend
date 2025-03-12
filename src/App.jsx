import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "./assets/components/adminPage";

function App() {
  return (
    <BrowserRouter>
      <Routes path="/*">
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
