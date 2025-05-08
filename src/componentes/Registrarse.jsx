import React, { useState, useRef } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../servicios/firebase"; // Ajusta la ruta si es diferente
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import { detectarRostro } from "./faceplusplus"; // Ajusta ruta si está en la misma carpeta
import "./Registrarse.css"; // Asegúrate de usar el CSS correcto

function Registrarse() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [captura, setCaptura] = useState(null);
  const [atributos, setAtributos] = useState(null);

  const navigate = useNavigate();
  const webcamRef = useRef(null);

  const handleCaptureAndDetect = async () => {
    if (!webcamRef.current) return;
    const screenshot = webcamRef.current.getScreenshot();
    if (!screenshot) {
      toast.error("No se pudo capturar imagen");
      return;
    }

    setCaptura(screenshot);
    try {
      const data = await detectarRostro(screenshot);
      if (data.faces && data.faces.length > 0) {
        const attr = data.faces[0].attributes;
        setAtributos(attr);
        toast.success(`Rostro detectado: Edad ${attr.age.value}, Género ${attr.gender.value}`);
      } else {
        toast.warning("No se detectó rostro");
      }
    } catch (error) {
      console.error("Error al detectar rostro:", error);
      toast.error("Error al procesar imagen");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!captura || !atributos) {
      toast.warning("Debes capturar tu rostro primero");
      return;
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const user = cred.user;

      await setDoc(doc(db, "Usuarios", user.uid), {
        email,
        firstName: fname,
        lastName: lname,
        photoBase64: captura,
        rostro: {
          edad: atributos.age?.value,
          genero: atributos.gender?.value,
          sonrisa: atributos.smile?.value
        }
      });

      toast.success("¡Usuario registrado con rostro!");
      navigate("/");
    } catch (error) {
      console.error("Error en el registro:", error.message);
      toast.error("Error al registrar usuario");
    }
  };


  return (
    <main>
      <h3>Registrarse</h3>
      <div className="loginPage">
        <h3 className="loginPage-title">Registrarse</h3>

        <form onSubmit={handleRegister}>

          <div class="mb-3">
            <label>Nombre</label>
          </div>
          
          <input
            type="text"
            placeholder="Nombre"
            required
            onChange={(e) => setFname(e.target.value)}
          />

          <div class="mb-3">
            <label>Apellido</label>
            
          </div>


          <input
            type="text"
            placeholder="Apellido"
            required
            onChange={(e) => setLname(e.target.value)}
          />

          <div class="mb-3">
            <label>Correo electrónico</label>
            
          </div>



          <input
            type="email"
            placeholder="Correo electrónico"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <div class="mb-3">
            <label>Contraseña</label><br />
            
          </div>


          <input
            type="password"
            placeholder="Contraseña"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <div style={{ marginTop: "15px", textAlign: "center" }}>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={320}
              height={240}
              style={{
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            />
            <button
              type="button"
              style={{ marginTop: "12px" }}
              onClick={handleCaptureAndDetect}
            >
              Capturar rostro con Face++
            </button>
          </div>

          <button type="submit">Registrarse</button>

          <p className="forgot-password">
            ¿Ya tienes cuenta? <a href="/login">Iniciar sesión</a>
          </p>
        </form>
      </div>
    </main>
  );
}

export default Registrarse;
