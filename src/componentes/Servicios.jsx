import React from 'react';
import '../componentes/Servicios.css';
import { Link } from 'react-router-dom';

const Contenido = () => {
    return (
        <main>
            {/* Sección Hero */}
            <section id="hero2">
                <div className="hero-text">
                    <h2>¿Le estás dando a tu mascota lo que realmente necesita? <br /> Por eso te ofrecemos:</h2>
                    <Link to="/productos" className="boton">Ver Productos</Link>
                </div>
            </section>

            {/* Sección de Servicios */}
            <section id="services" className="cuerpo">
                <h2>Nuestros Servicios</h2>
                <div className="service-grid">
                    {/* Tarjeta de servicio: Paseos */}
                    <div className="service-card">
                        <h3>Paseos</h3>
                        <p>¡Tu mascota feliz y ejercitada! Nuestros paseadores se aseguran de que salga solo con su momento especial.</p>
                        <a href="#Paseos" className="boton">Ver más</a>
                    </div>

                    {/* Tarjeta de servicio: Estética */}
                    <div className="service-card">
                        <h3>Estética</h3>
                        <p>Excelente servicio cosmético para tu mascota. Con opciones de atención en cualquier lugar.</p>
                        <a href="#Estetica" className="boton">Ver más</a>
                    </div>

                    {/* Tarjeta de servicio: Sin Jaulas */}
                    <div className="service-card">
                        <h3>Sin Jaulas</h3>
                        <p>Los cuidadores registrados en nuestra página no encierran a las mascotas, siempre en su propio espacio, como si fuera suya.</p>
                        <a href="#Sin_jaulas" className="boton">Ver más</a>
                    </div>
                </div>
            </section>

            <div className="mas_informacion">
        <h2>Más Información</h2>
            </div>
    <section id="Paseos" className="paseos">
        <div className="mas_contenido">
            <h2>Paseos</h2>
            <p>En Quito, contamos con paseadores capacitados que se encargan de que tu mascota disfrute de paseos seguros y divertidos.</p>
            <ul>
                <li>Atención personalizada: Cada mascota sale sola o con otras de comportamiento compatible.</li>
                <li>Ejercicio y bienestar: Ayudamos a reducir el estrés y mejorar su salud física y mental.</li>
                <li>Seguridad garantizada: Nuestros paseadores están capacitados para manejar cualquier situación.</li>
            </ul>
        </div>
    </section>
    <section id="Estetica" className="estetica">
        <div className="mas_contenido">
            <h2>Estética</h2>
            <p>Ofrecemos servicios de estética profesional con opciones de atención a domicilio o en un centro especializado.</p>
            <ul>
                <li><strong>Baños especializados:</strong> Con productos hipoalergénicos adecuados para el clima de momento.</li>
                <li><strong>Corte de pelo y peinado:</strong> Adaptado a la raza y preferencias del dueño.</li>
                <li><strong>Cuidado de uñas, orejas y dientes:</strong> Para una higiene completa.</li>
            </ul>
        </div>
    </section>
    <section id="Sin_jaulas" className="sin_jaulas">
        <div className="mas_contenido">
            <h2>Sin Jaulas</h2>
            <p>Los cuidadores registrados ofrecen un enfoque de cuidado único, priorizando el bienestar emocional de tu mascota.</p>
            <ul>
                <li><strong>Hospedaje personalizado:</strong> Tu mascota permanece en el hogar del cuidador, integrándose como parte de la familia.</li>
                <li><strong>Cuidado en casa:</strong> El cuidador puede atender a tu mascota en tu propio hogar, respetando su entorno y rutina.</li>
                <li><strong>Actividades enriquecedoras:</strong> Tiempo de juego, paseos y mucho cariño, todo dentro de un ambiente seguro.</li>
            </ul>
        </div>
    </section>   
            
        </main>
    );
};

export default Contenido;
