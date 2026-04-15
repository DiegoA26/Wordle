let listaPalabras = [
"casa","perro","gato","mesa","silla","libro","coche","avion","barco","tren",
"calle","plaza","campo","playa","rio","lago","monte","bosque","cielo","nube",
"llave","puerta","ventana","pared","techo","suelo","jardin","flor","hoja","rama",
"fruta","queso","pan","leche","carne","pasta","arroz","sopa","huevo","dulce",
"sal","azul","rojo","verde","negro","blanco","gris","rosa","marron","dorado",
"plata","cobre","hierro","acero","oro","plomo","zinc","metal","arena","roca",
"tierra","barro","humo","fuego","agua","viento","clima","tiempo","dia","noche",
"tarde","manana","lunes","martes","jueves","viernes","sabado","domingo","mes",
"enero","febrero","marzo","abril","mayo","junio","julio","agosto","octubre",
"noviem","dicie","amigo","amiga","padre","madre","hermano","hermana","tio","tia",
"primo","prima","hijo","hija","nieto","nieta","gente","grupo","equipo","clase",
"curso","nivel","grado","escuela","colegio","oficio","trabajo","puesto","cargo",
"jefe","lider","autor","actor","actriz","pintor","poeta","musico","doctor","medico",
"salud","virus","cura","dosis","plaga","dolor","fiebre","tos","nariz","boca",
"ojos","cara","mano","brazo","pierna","pie","cuerpo","mente","alma","idea",
"mente","logica","razon","dato","hecho","caso","tema","punto","parte","serie",
"lista","grupo","orden","nivel","paso","forma","modo","tipo","clase","estilo",
"linea","curva","plano","figura","color","tono","sombra","luz","brillo","foco",
"sonido","ruido","voz","musica","ritmo","canto","nota","clave","tono","eco",
"juego","nivel","pista","meta","gol","red","campo","equipo","liga","torneo",
"carta","dado","ficha","turno","regla","punto","marca","tabla","juego","azar",
"codigo","clave","token","dato","red","nodo","cable","wifi","senal","router",
"web","app","login","user","clave","error","fallo","bug","patch","build",
"test","debug","script","funcion","clase","objeto","array","lista","valor","tipo",
"venta","compra","precio","costo","gasto","saldo","cuota","pago","deuda","banco",
"caja","cuenta","tarjeta","credito","debito","firma","legal","norma","ley","regla",
"justo","culpa","caso","juicio","prueba","testigo","juez","corte","fallo","pena",
"viaje","ruta","mapa","guia","hotel","vuelo","tren","taxi","bus","metro",
"parada","salida","llegar","salir","andar","correr","subir","bajar","girar","seguir",
"mirar","ver","oido","oir","tocar","sentir","oler","gustar","probar","saber",
"pensar","creer","dudar","amar","odiar","reir","llorar","gritar","callar","hablar",
"decir","contar","sumar","restar","medir","pesar","cortar","romper","unir","crear",
"formar","usar","hacer","tener","dar","tomar","dejar","poner","quitar","abrir",
"cerrar","entrar","salir","vivir","morir","nacer","crecer","cambiar","seguir","parar",
"ganar","perder","buscar","hallar","lograr","fallar","intento","prueba","error","exito",
"rapido","lento","corto","largo","alto","bajo","ancho","estre","grande","chico",
"nuevo","viejo","bueno","malo","mejor","peor","igual","distin","cerca","lejos",
"claro","oscuro","duro","suave","fuerte","debil","calido","frio","seco","humedo",
"limpio","sucio","lleno","vacio","rico","pobre","caro","barato","facil","dificil"
];

//Selecionar palabra
const palabraElegida = "";
let palabra = [];

//Contenedores
const listaPalabrasIntentos = document.querySelectorAll(".contenedor-palabra");
const intentosTotales = listaPalabrasIntentos.length;
let contadorIntentos = 0;
let contadorLetraActiva = 0;

const btnAdivinarPalabra = document.getElementById("btn-adivinarPalabra");

let juegoGanado = false;

function inicio() {

    console.log("EMPIEZA ----------");
    obtenerPalabraAleatoriaLocal(6);
    // obtenerPalabraAleatoriaConApi();
}

function obtenerPalabraAleatoriaLocal(longitud){
    
    const lista = longitud
        ? listaPalabras.filter(p => p.length == longitud)
        : listaPalabras;

    const index = Math.floor(Math.random() * lista.length);
    // palabraElegida = lista[index];
    configuracionPalabraInicial(lista[index]);
}

async function obtenerPalabraAleatoriaConApi() {
    try {
        const response = await fetch("http://localhost:3000/api-palabras/palabra-random?longitud=6");
        const data = await response.json();
        // console.log(data);
        if(data!==null){configuracionPalabraInicial(data)};
        
    } catch (error) {
        
        // console.error("Error:", error);
    }
}

function configuracionPalabraInicial(palabraE) {
    let palabraMinuscula = palabraE.toLowerCase();
    palabra = palabraMinuscula.split("");
    console.log("palabra : " + palabra);
}

function adivinarPalabra() {
    if (juegoGanado) {
        return;
    }

    //Comprobar palabra escrita en la posicion que corresponda
    //Formar la palabra en un array para su comprobacion
    const listaInputsLetras = listaPalabrasIntentos[
        contadorIntentos
    ].querySelectorAll(".contenedor-letra > input");
    let palabraUsuario = [];
    palabraUsuario = crearPalabra(listaInputsLetras);
    // console.log("El usuario intento la palabra: " + palabraUsuario);
    // console.log(typeof palabraUsuario);

    //Comprueba si estan todas las letras completas
    if (palabraUsuario.length < palabra.length) {
        console.log("menor");
        return;
    }

    // Comprobar si la palabra es correcta
    if (!compararPalabra(listaInputsLetras, palabraUsuario)) {
        //INCORRECTO
        contadorIntentos++;
        actualizarHabilitarLetras();
    } else {
        console.log("PALABRA RESUELTA");
    }
}

function actualizarHabilitarLetras() {
    //recorrer todos los intentos, si no es el intento pertinente se desabilita, si no se habilita
    listaPalabrasIntentos.forEach((divPalabra, index) => {
        //lista con los divs dentro de la palbra que toca, despues se recorrera y se añadira o quiotara el disable
        const listaInputsLetras = divPalabra.querySelectorAll(
            ".contenedor-letra > input",
        );

        if (index !== contadorIntentos) {
            listaInputsLetras.forEach((input) => {
                input.disabled = true;
            });
        } else {
            listaInputsLetras.forEach((input, i) => {
                input.disabled = false;
                if (i === 0) {
                    contadorLetraActiva = 0;
                    input.focus();
                }
            });
        }
    });
}

function compararPalabra(listaInputsLetras, arrayPalabraUsuario) {
    //va sumando 1 si la letra es correcta, si al final el valor es igual a la longitud de la palabra es que es igual.
    let contador = 0;

    //
    //recorre la lista de la palabra del usuarui comparando con la palabra del sistema
    arrayPalabraUsuario.forEach((letraUsuario, index) => {
        if (letraUsuario.toLowerCase() === palabra[index]) {
            contador++;
            listaInputsLetras[index].classList.add("correcto");
        } else if (palabra.includes(letraUsuario)) {
            listaInputsLetras[index].classList.add("presente");
        } else {
            listaInputsLetras[index].classList.add("incorrecto");
        }
    });

    if (contador === palabra.length) {
        //CORRECTO

        ganarPartida();
        return true;
    } else {
        //Mal
    }
    return false;
}

function crearPalabra(listaInputs) {
    let palabraArray = [];

    listaInputs.forEach((element) => {
        if (element.value !== "") {
            palabraArray.push(element.value);
        }
    });

    return palabraArray;
}

function ganarPartida() {
    juegoGanado = true;

    //Desabilitar todos los inputs
    const inputs =
        listaPalabrasIntentos[contadorIntentos].querySelectorAll("input");
    inputs.forEach((element) => {
        element.disabled = true;
    });
}

btnAdivinarPalabra.addEventListener("click", () => adivinarPalabra());

document.addEventListener("keyup", function (event) {
    if (juegoGanado) {
        return;
    }

    const letra = event.key.toLowerCase();
    const listaInputsLetras = listaPalabrasIntentos[
        contadorIntentos
    ].querySelectorAll(".contenedor-letra > input");

    // Solo letras a-z
    if (/^[a-z]$/.test(letra)) {
        if (contadorLetraActiva < listaInputsLetras.length) {
            listaInputsLetras[contadorLetraActiva].value = letra;
            listaInputsLetras[contadorLetraActiva].blur();

            contadorLetraActiva++;

            if (contadorLetraActiva < listaInputsLetras.length) {
                listaInputsLetras[contadorLetraActiva].focus();
            }
        }
    }

    if (event.key === "Backspace") {
        if (contadorLetraActiva > 0) {
            // if(listaInputsLetras[contadorLetraActiva].value = "";)
            contadorLetraActiva--;
            listaInputsLetras[contadorLetraActiva].value = "";
            listaInputsLetras[contadorLetraActiva].focus();
        }
    }

    if (event.key === "ArrowRight") {
    if (contadorLetraActiva + 1 < listaInputsLetras.length) {
        listaInputsLetras[contadorLetraActiva].blur();
        contadorLetraActiva++;
        listaInputsLetras[contadorLetraActiva].focus();
    }
}

    if (event.key === "ArrowLeft") {
    if (contadorLetraActiva > 0) {
        listaInputsLetras[contadorLetraActiva].blur();
        contadorLetraActiva--;
        listaInputsLetras[contadorLetraActiva].focus();
    }
}

    if (event.key === "Enter") {
        adivinarPalabra();
    }
});

inicio();
