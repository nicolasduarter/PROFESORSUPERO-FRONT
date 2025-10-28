// src/modules/autenticacion/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import api from "../../services/api";

function Login() {
    const navigate = useNavigate();

    const [rol, setRol] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!rol || !username || !password) {
            alert("Por favor completa todos los campos.");
            return;
        }

        try {
            const response = await api.post("/Login/Autenticacion", {
                usuario: username,
                contra: password,
            });

            const userData = response.data;

            console.log("✅ Login exitoso:", userData);

            // Guardar los datos del usuario (incluyendo facultad e id si existen)
            const userToStore = {
                id: userData.id,
                usuario: userData.usuario,
                rol: userData.rol,
                facultad: userData.facultad || null,
            };
            localStorage.setItem("user", JSON.stringify(userToStore));
            localStorage.setItem("id", userToStore.id);

            // Redirigir según el rol
            if (userData.rol === "ESTUDIANTE") {
                navigate("/dashboard/estudiante");
            } else if (userData.rol === "DECANATURA") {
                navigate("/dashboard/decano");
            } else if (userData.rol === "ADMINISTRATOR") {
                navigate("/dashboard/administrador");
            } else {
                alert("Rol no reconocido: " + userData.rol);
            }

        } catch (error) {
            console.error("❌ Error al iniciar sesión:", error);
            alert("Credenciales incorrectas o error de conexión con el servidor.");
        }
    };


    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border border-gray-200">
                <div className="text-center mb-6">
                    <div className="flex justify-center items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-md bg-green-600 flex items-center justify-center text-white text-lg font-bold">
                            ⏰
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-800">SIRHA</h1>
                    </div>
                    <p className="text-gray-500 text-sm">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Select
                        label="Select Role *"
                        value={rol}
                        onChange={(e) => setRol(e.target.value)}
                        options={[
                            { value: "", label: "Choose your role" },
                            { value: "estudiante", label: "Estudiante" },
                            { value: "decanatura", label: "Decanatura" },
                            { value: "administrador", label: "Administrador" }
                        ]}
                    />

                    <Input
                        label="Username *"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                    />

                    <Input
                        label="Password *"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />

                    <div className="flex items-center justify-between">
                        <label className="flex items-center text-sm text-gray-600">
                            <input
                                type="checkbox"
                                checked={remember}
                                onChange={() => setRemember(!remember)}
                                className="mr-2"
                            />
                            Remember me
                        </label>
                        <a
                            href="#"
                            className="text-sm text-green-600 hover:underline font-medium"
                        >
                            Forgot password?
                        </a>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full bg-green-600 hover:bg-green-700"
                    >
            <span className="flex items-center justify-center gap-2">
              <i className="fa-solid fa-right-to-bracket"></i> Sign In
            </span>
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>
                        Need help?{" "}
                        <a href="#" className="text-green-600 font-medium hover:underline">
                            Contact Support
                        </a>
                    </p>
                </div>
            </div>

            <footer className="mt-8 text-xs text-gray-400">
                © 2025 SIRHA. All rights reserved.
            </footer>
        </div>
    );
}

export default Login;


