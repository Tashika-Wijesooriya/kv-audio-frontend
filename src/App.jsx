import { useState } from "react";

import AdminPage from "./assets/components/adminPage";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);
    // Add authentication logic here
  };

  return (
    <BrowserRouter>
      <div>
        <AdminPage />
      </div>
    </BrowserRouter>
  );
}

export default App;
