//Selecionar palabra
const palabraElegida = "abuela";
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
    obtenerPalabraAleatoria();
    configuracionPalabraInicial();
}

async function obtenerPalabraAleatoria() {
    try {
        const response = await fetch("http://localhost:3000/api-palabras/palabra-random?longitud=6");
        const data = await response.json();
        console.log(data);
        configuracionPalabraInicial(data);
    } catch (error) {
        console.error("Error:", error);
    }
}

function configuracionPalabraInicial(palabraE) {
    let palabraMinuscula = palabraE.toLowerCase();
    palabra = palabraMinuscula.split("");
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
            contadorLetraActiva--;
            listaInputsLetras[contadorLetraActiva].value = "";
            listaInputsLetras[contadorLetraActiva].focus();
        }
    }

    if (event.key === "Enter") {
        adivinarPalabra();
    }
});

inicio();
