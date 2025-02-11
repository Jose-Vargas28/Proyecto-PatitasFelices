import React, { useState, useEffect } from "react";
import { db } from "../servicios/firebase"; 
import { collection, addDoc, getDocs } from "firebase/firestore";
import Encabezado from "../componentes/Encabezado"; // Importar Encabezado
import PieDePagina from "../componentes/PieDePagina"; // Importar PieDePagina
import '../componentes/Productos.css';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");

  // Función para obtener productos desde Firebase
  const fetchProductos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "proyecto"));
      const productosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(productosData.slice(0, 3)); // Solo mostrar 3 productos
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  // Función para agregar un nuevo producto
  const addProducto = async () => {
    if (nombre.trim() === "" || cantidad.trim() === "") {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      await addDoc(collection(db, "proyecto"), {
        nombre,
        cantidad: parseInt(cantidad),
      });
      alert("Producto agregado correctamente.");
      setNombre("");
      setCantidad("");
      fetchProductos(); // Actualizar la lista de productos
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  // Cargar los productos cuando el componente se monte
  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div>
      
      
      <h2>Productos para Mascotas</h2>

      {/* Sección con tres cajas de información */}
      <div className="cajas-info">
        <div className="caja">
          <img src="imagenes/correa.jpg" alt="Caja 1" className="imagen-caja" />
          <h3>Correas</h3>
          <p>La correa perfecta para tus paseos diarios. Con diseño ergonómico y resistente, garantiza comodidad y seguridad para tu perro en cada caminata. ¡Haz que tu mascota disfrute de cada paso con estilo!</p>
        </div>
        <div className="caja">
          <img src="imagenes/pelotas.jpg" alt="Caja 2" className="imagen-caja" />
          <h3>Pelotas de juego</h3>
          <p>La diversión nunca termina con nuestras pelotas de juego. Hechas con materiales duraderos, ideales para mantener a tu perro activo, saludable y entretenido. ¡Hora de jugar!</p>
        </div>
        <div className="caja">
          <img src="imagenes/snacks.jpg" alt="Caja 3" className="imagen-caja" />
          <h3>Snacks</h3>
          <p>Premia a tu mascota con nuestros deliciosos snacks. Hechos con ingredientes naturales que cuidan su salud mientras disfrutan de un sabor irresistible. ¡Porque tu perro también merece consentirse!</p>
        </div>
      </div>

      {/* Formulario para agregar un nuevo producto */}
      <div className="formulario-producto">
    <h3>Agregar Nuevo Producto</h3>
    <input
        type="text"
        placeholder="Nombre del producto"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
    />
    <input
        type="number"
        placeholder="Cantidad"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
    />
    <button onClick={addProducto}>Agregar</button>
     </div>

     
    </div>
  );
};

export default Productos;
