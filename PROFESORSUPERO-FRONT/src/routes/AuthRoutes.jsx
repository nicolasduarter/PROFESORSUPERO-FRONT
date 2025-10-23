import { Routes, Route } from "react-router-dom";
import Login from "../modules/autenticacion/Login";

function AuthRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
        </Routes>
    );
}

export default AuthRoutes;
