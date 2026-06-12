
// Al cargar la página, nos aseguramos de que las temporadas y el video estén ocultos
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("pantallaTemporadas").style.display = "none";
    document.getElementById("pantallaVideoCompleto").style.display = "none";
    
    // Y nos aseguramos de que la de perfiles sea la única que SÍ se vea al arrancar
    document.getElementById("pantallaPerfiles").style.display = "flex";
});
// 1. ANIMACIÓN DE INTRO Y PERFILES

// CONFIGURACIÓN: Tu contraseña personalizada (todo en minúsculas)
// CONFIGURACIÓN: Tu contraseña personalizada
// CONFIGURACIÓN: Tu contraseña personalizada
const CONTRASEÑA_CORRECTA = "tequierobelen"; 

// Abre la interfaz para poner la contraseña de letras
function mostrarBloqueoPIN() {
    // ⚠️ Revisa que estos IDs existan en tu HTML:
    const contenedorPerfil = document.getElementById("contenedor-perfil-bloqueado");
    const pantallaPin = document.getElementById("pantalla-pin");
    
    if (contenedorPerfil && pantallaPin) {
        contenedorPerfil.style.display = "none";
        pantallaPin.style.display = "flex";
        
        // Hace foco automático en la caja de texto
        const inputTexto = document.getElementById("input-password-texto");
        if (inputTexto) {
            inputTexto.value = ""; // Limpia si había algo escrito antes
            inputTexto.focus();

            // Permite entrar presionando "Enter"
            inputTexto.onkeydown = function(e) {
                if (e.key === "Enter") {
                    validarContrasenaTexto();
                }
            };
        }
    } else {
        console.log("Error: No se encontraron los contenedores en el HTML.");
    }

    

        
    };


// Verifica si la palabra es correcta
function validarContrasenaTexto() {
    const inputTexto = document.getElementById("input-password-texto");
    const mensajeError = document.getElementById("mensaje-error-pin");
    const sonido = document.getElementById("sonidoNetflix");

    if (inputTexto.value.toLowerCase() === CONTRASEÑA_CORRECTA.toLowerCase()) {
        
        // 1. REPRODUCIR EL SONIDO DE NETFLIX
        if (sonido) {
            sonido.currentTime = 0; // Reinicia el audio
            sonido.volume = 1.0;    // Volumen al máximo
            sonido.play().catch(err => console.log("Error al reproducir audio: ", err));
        }

        // 2. OCULTAR LA CLAVE Y ACTIVAR LA INTRO ANIMADA
        document.getElementById("pantalla-pin").style.display = "none";
        
        const intro = document.getElementById("introNetflix");
        if (intro) {
            intro.style.display = "flex"; // Muestra la animación "NETFLIX" grande flotando
            
            // 3. ESPERAR A QUE TERMINE LA INTRO (2.5 segundos) Y MOSTRAR EL CATÁLOGO REAL
            setTimeout(() => {
                // Ocultamos toda la sección de perfiles por completo
                document.getElementById("pantallaPerfiles").style.display = "none";
                intro.style.display = "none";
                
                // Muestra la pantalla principal (Tu contenedor original se llama 'netflix')
                const catalogo = document.getElementById("netflix");
                if (catalogo) {
                    catalogo.style.display = "block";
                }
                
                // Activa el video de fondo del catálogo si existe
                const videoFondo = document.getElementById("videoFondo");
                if (videoFondo) {
                    videoFondo.play().catch(err => console.log("Error al reproducir video fondo: ", err));
                }
            }, 2500); // Espera exactamente los 2.5 segundos que dura tu animación CSS
            
        } else {
            // Si por alguna razón no encuentra la intro, pasa directo al catálogo sin trabarse
            document.getElementById("pantallaPerfiles").style.display = "none";
            const catalogo = document.getElementById("netflix");
            if (catalogo) catalogo.style.display = "block";
        }

    } else {
        // Contraseña incorrecta
        if (mensajeError) {
            mensajeError.style.visibility = "visible";
        }
        if (inputTexto) {
            inputTexto.value = "";
            inputTexto.focus();
        }
    }
}

// Botón regresar por si quiere volver a la pantalla de perfiles
function cancelarPIN() {
    document.getElementById("mensaje-error-pin").style.visibility = "hidden";
    document.getElementById("pantalla-pin").style.display = "none";
    document.getElementById("contenedor-perfil-bloqueado").style.display = "block";
}
window.onload = function() {
    // Esconde la intro de Netflix después de 3 segundos para mostrar perfiles
    setTimeout(() => {
        const intro = document.getElementById("introNetflix");
        const perfiles = document.getElementById("pantallaPerfiles");
        if (intro) intro.style.display = "none";
        if (perfiles) perfiles.style.display = "flex";
    }, 3000);
};

function entrarNetflix() {
    // Reproduce sonido Tudum
    const sonido = document.getElementById("tudum");
    if (sonido) sonido.play();

    // Pasa de perfiles a la pantalla principal
    document.getElementById("pantallaPerfiles").style.display = "none";
    document.getElementById("netflix").style.display = "block";
}

// 2. NAVEGACIÓN DE LAS PANTALLAS DE VIDEO
function abrirTemporadas() {
    const catalogoPrincipal = document.getElementById("netflix");
    const pantallaTemporadas = document.getElementById("pantallaTemporadas");
    
    if (pantallaTemporadas) {
        // 1. Ocultamos el catálogo de inicio
        if (catalogoPrincipal) catalogoPrincipal.style.display = "none";
        
        // 2. FORZAMOS los estilos para que aparezca sí o sí en pantalla
        pantallaTemporadas.style.setProperty("display", "block", "important");
        pantallaTemporadas.style.visibility = "visible";
        pantallaTemporadas.style.opacity = "1";
        
        // 3. Pausamos el video de fondo anterior
        const videoFondo = document.getElementById("videoFondo");
        if (videoFondo) videoFondo.pause();
        
        console.log("Pantalla de temporadas forzada correctamente.");
    } else {
        console.log("Error: No se encontró el ID 'pantallaTemporadas'");
    }

}

function verTemporada1() {
    // Escondemos las temporadas y mostramos el reproductor completo
    document.getElementById("pantallaTemporadas").style.display = "none";
    document.getElementById("pantallaVideoCompleto").style.display = "flex";
    
    // Reproducimos el video principal
    const video = document.getElementById("videoCompleto");
    video.play().catch(err => console.log("Error al reproducir: ", err));
}

function regresarATemporadas() {
    // Pausamos el video completo
    const video = document.getElementById("videoCompleto");
    video.pause();

    // Volvemos a la lista de temporadas
    document.getElementById("pantallaVideoCompleto").style.display = "none";
    document.getElementById("pantallaTemporadas").style.display = "block";
}

function regresarAlInicio() {
    // 1. Ocultamos las pantallas de los videos y las temporadas
    document.getElementById("pantallaTemporadas").style.display = "none";
    document.getElementById("pantallaVideoCompleto").style.display = "none";
    
    // 2. Nos aseguramos de que la pantalla de perfiles SE QUEDE OCULTA
    document.getElementById("pantallaPerfiles").style.display = "none";
    
    // 3. Mostramos la página principal de Netflix directo
    document.getElementById("netflix").style.display = "block";
    
    // 4. Volvemos a encender el video de fondo del banner
    document.getElementById("videoFondo").play();

}