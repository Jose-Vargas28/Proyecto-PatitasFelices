import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../servicios/firebase"; // Cambié la importación aquí
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Importamos useNavigate para la redirección

function Registrarse() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const navigate = useNavigate(); // Hook para redirección

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validación para la contraseña
    if (password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres", { position: "bottom-center" });
      return;
    }

    try {
      // Crear el usuario con correo y contraseña
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (user) {
        // Si el usuario fue creado, guardar la información en Firestore
        await setDoc(doc(db, "Usuarios", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          photo: ""
        });

        // Mostrar mensaje de éxito
        toast.success("¡Usuario registrado con éxito!", { position: "top-center" });

        // Redirigir al usuario a la página de perfil
        navigate("/");
      }
    } catch (error) {
      // Manejo de errores
      console.error("Error en el registro:", error.code, error.message);
      if (error.code === 'auth/email-already-in-use') {
        toast.error("¡El correo electrónico ya está en uso!", { position: "bottom-center" });
      } else if (error.code === 'auth/weak-password') {
        toast.error("La contraseña debe tener al menos 6 caracteres", { position: "bottom-center" });
      } else {
        toast.error(error.message, { position: "bottom-center" });
      }
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleRegister}>
        <h3>Registrarse</h3>

        <div className="mb-3">
          <label>Nombre</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingresa tu nombre"
            onChange={(e) => setFname(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Apellido</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingresa tu apellido"
            onChange={(e) => setLname(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            placeholder="Ingresa tu correo"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Contraseña</label>
          <input
            type="password"
            className="form-control"
            placeholder="Ingresa tu contraseña"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Registrarse
          </button>
        </div>

        <p className="forgot-password text-right">
          ¿Ya tienes cuenta? <a href="/login">Iniciar sesión</a>
        </p>
      </form>
    </div>
  );
}

export default Registrarse;
