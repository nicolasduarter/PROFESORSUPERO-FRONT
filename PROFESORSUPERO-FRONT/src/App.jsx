// src/App.jsx
import { Routes, Route } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import DashboardRoutes from "./routes/DashboardRoutes";

function App() {
    return (
        <Routes>
            <Route path="/*" element={<AuthRoutes />} />

            <Route path="/dashboard/*" element={<DashboardRoutes />} />
        </Routes>
    );
}

export default App;

