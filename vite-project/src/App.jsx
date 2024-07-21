import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { AuthProvider } from "./contexts/AuthContext";

import { BrowserRouter as Routers, Route, Routes } from "react-router-dom";
import Router from "./routes/Routes";

function App() {
  return (
    <>
      <AuthProvider>
        <Routers>
          <Routes>
            <Route path="/*" element={<Router />} />
          </Routes>
        </Routers>
      </AuthProvider>
    </>
  );
}

export default App;
