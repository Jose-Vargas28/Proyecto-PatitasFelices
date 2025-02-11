import React from 'react';
import '../componentes/PieDePagina.css';


const PieDePagina = () => {
    return (
        <footer>
            <p>Síguenos:</p>
            <div className="social-icons">
                {/* Iconos de redes sociales ubicados en la carpeta public/imagenes */}
                <a href="https://www.facebook.com"><img src="/imagenes/facebbook.png" alt="Facebook" /></a>
                <a href="https://www.instagram.com"><img src="/imagenes/instagram.png" alt="Instagram" /></a>
                <a href="https://twitter.com"><img src="/imagenes/X.png" alt="Twitter" /></a>
                <a href="https://web.whatsapp.com"><img src="/imagenes/whatsapp.png" alt="WhatsApp" /></a>
            </div>
            <p>&copy; 2024 Patitas felices. Todos los derechos reservados.</p>
            <p><a href="#privacy-policy">Política de Privacidad</a></p>
        </footer>
    );
};

export default PieDePagina;
