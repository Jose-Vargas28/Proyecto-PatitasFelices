import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../servicios/Credenciales";
import { toast } from "react-toastify";
import "../componentes/Login.css";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const logear = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Inicio de sesión exitoso");
            navigate("/profile"); // Redirigir al perfil
        } catch (error) {
            toast.error("Error al iniciar sesión: " + error.message);
        }
    };

    return (
        <main>
            <div className="loginPage">
                <h1 className="loginPage-title">Iniciar sesión</h1>
                <form onSubmit={logear}>
                    <div className="mb-3">
                        <label>Correo electrónico</label>
                        <input
                            type="email"
                            placeholder="Ingrese su correo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            placeholder="Ingrese su contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Iniciar sesión</button>
                </form>
                <p className="forgot-password">
                    ¿Nuevo usuario? <a href="/registrarse">Regístrate aquí</a>
                </p>
                <button className="regresar-btn" onClick={() => navigate("/")}>
                    Regresar a Home
                </button>
            </div>
        </main>
    );
};

export default LoginPage;