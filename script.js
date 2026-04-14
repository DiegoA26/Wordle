//Selecionar palabra
const palabraElegida = "cursoo";
let palabra = [];

//Contenedores
const listaPalabrasIntentos = document.querySelectorAll(".contenedor-palabra");
const intentosTotales = listaPalabrasIntentos.length;
let contadorIntentos = 0;

const btnAdivinarPalabra = document.getElementById("btn-adivinarPalabra");


function inicio(){
    console.log("EMPIEZA ----------");
    
    configuracionPalabraInicial();
    console.log("palabra elwgida: " + palabra);
}





function configuracionPalabraInicial(){
    let palabraMinuscula = palabraElegida.toLowerCase();
    palabra = palabraMinuscula.split("");
}


function adivinarPalabra(){

    //Comprobar palabra escrita en la posicion que corresponda
    //Formar la palabra
    const listaInputsLetras = listaPalabrasIntentos[contadorIntentos].querySelectorAll(".contenedor-letra > input");
    let palabraUsuario = [];
    palabraUsuario=crearPalabra(listaInputsLetras);
    console.log("El usuario intento la palabra: " + palabraUsuario);
    // console.log(typeof palabraUsuario);
    
    // Comprobar si la palabra es correcta
    if(!compararPalabra(listaInputsLetras, palabraUsuario)){
        //INCORRECTO
        contadorIntentos++;
        actualizarHabilitarLetras();
    }
    else{
        console.log("MAL");
    }
}

function actualizarHabilitarLetras(){

}

function compararPalabra(listaInputsLetras,arrayPalabraUsuario){
    let contador = 0;

    //recorre la lista comparando con la segunda
    arrayPalabraUsuario.forEach((letraUsuario,index) => {
        if(letraUsuario.toLowerCase() === palabra[index]){
            contador++;
            listaInputsLetras[index].classList.add("correcto");
        }
        else if(palabra.includes(letraUsuario)){
            listaInputsLetras[index].classList.add("presente");
        }
        else{
            listaInputsLetras[index].classList.add("incorrecto");
        }
    });

    if(contador === palabra.length){
        return true;
    }
    return false;
}



function crearPalabra(listaInputs){
    let palabraArray = [];

    listaInputs.forEach((element) => {
        palabraArray.push(element.value);
    });
    
    return palabraArray;
}



btnAdivinarPalabra.addEventListener("click", ()=>adivinarPalabra());






inicio();