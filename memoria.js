// Necesitamos 6 pares de elementos
// Definir un tablero con esos 12 elementos ubicados al azar, y ocultos al usuario
// el jugador ingresa coordenadas para descubrir elementos
// comparamos si las coordenadas contienen elementos concidentes
// Devuelve resultado de la jugada: erró / acertó
// Si acierta, los elementos quedan descubiertos en el tablero
// se sigue jugando hasta terminar los 5 intentos o hasta descubrir todo el tablero


//===========================//
///// ==== FUNCIONES ===== ////
//===========================//

// creo una función que genere un array de pares, dada una lista de elementos y la cantidad final que deberá resultar
const generarPares = (arrayElementosBase, cantidadElementosFinal) => {
    // Defino cuáles son los elementos a usar, de la lista de elementos existentes
    let elementosUsados = arrayElementosBase.slice(0, (cantidadElementosFinal / 2));

    // Repito los elementos para obtener los pares
    return elementosUsados.concat(elementosUsados) /// devuelve un array con elementos duplicados
}

// creo una funcion para mezclar un array de elementos
const mezclarArray = (array) => {
    let arrayMezclado = array;

    for (let i = arrayMezclado.length - 1; i >= 0; i--) {
        let j = Math.floor(Math.random() * (i));
        let temp = arrayMezclado[i];
        arrayMezclado[i] = arrayMezclado[j];
        arrayMezclado[j] = temp;
    }

    return arrayMezclado // devuelve el array con sus elementos mezclados
}

// creo función que genere un array de pares mezclados, en base a un array de elementos
const generarParesMezclados = (arrayElementosBase, cantidadElementosFinal) => {
    // genero los pares en base a elementos dados
    let pares = generarPares(arrayElementosBase, cantidadElementosFinal);
    // los mezclo
    let paresMezclados = mezclarArray(pares);

    return paresMezclados

}

// Crear una función que haga un array de elementos ocultos, en base a una lista de elementos
const generarListaElementosOcultos = listaElementosDelJuego => {
    let listaElementosOcultos = [];

    for (let i = 0; i < listaElementosDelJuego.length; i++) {
        listaElementosOcultos.push("📦");

    }

    return listaElementosOcultos;
}


// Creo función para mostrar un tablero en base a un array 2D
const imprimirArray2D = (array2D) => {

    let tableroFinal = ""
    for (let i = 0; i < array2D.length; i++) {
        for (let j = 0; j < array2D[i].length; j++) {
            tableroFinal += array2D[i][j] + " ";

        }
        tableroFinal += "\n"
    }

    return tableroFinal; /// devuelve un string del tableroJuego

}

// Crear una función que muestre un tablero de filas de 4, en base a un array unidimensional
const mostrarArrayFormatoTablero = arrayUnidimensional => {
    let array = arrayUnidimensional;
    let tablero = [];
    // recorro el array de base para armar un array2d
    for (let i = 0; i < array.length; i += 4) {
        const fila = array.slice(i, i + 4);
        tablero.push(fila);
    }

    // imprimo el array2D
    return imprimirArray2D(tablero);

}


// Crear una función que compare las coordenadas para saber si son concidentes
const chequearCoincidencia = (coordenadas, listaElementosDelJuego) => {
    const sonIguales = listaElementosDelJuego[coordenadas[0]] === listaElementosDelJuego[coordenadas[1]];

    return sonIguales
}


// creo función que muestra resultado de intento
const mensajeConResultadoDeIntento = (coordenadas, listaElementosDelJuego) => {

    const sonIguales = chequearCoincidencia(coordenadas, listaElementosDelJuego);

    const mensajeIntento = sonIguales ? "\nCoincidencia!" : "\nFalló";

    return mensajeIntento

}



// Crear una función que actualice la lista de elementos ocultos, dejando descubierto los elementos si son iguales
const actualizarListaElementosOcultos = (coordenadas, listaElementosDelJuego, listaElementosOcultos) => {

    let elementosJuego = listaElementosDelJuego;
    let elementosOcultos = listaElementosOcultos;

    if (elementosJuego[coordenadas[0]] === elementosJuego[coordenadas[1]]) {
        elementosOcultos[coordenadas[0]] = elementosJuego[coordenadas[0]];
        elementosOcultos[coordenadas[1]] = elementosJuego[coordenadas[1]];
    } else {
        elementosOcultos[coordenadas[0]] = "📦";
        elementosOcultos[coordenadas[1]] = "📦";
    }

    return elementosOcultos;
}

// creo una función para crear mensaje con el historial global del juego
const obtenerHistorialGlobal = (resultado, intentos, contadorIntentos, numeroPartida, cantidadElementos) => {
    let historialPartida = "";
    if (resultado === "Ganó") {
        historialPartida = `Partida: ${numeroPartida} | Tamaño del Tablero: ${cantidadElementos} elementos | Ganada | ${intentos - contadorIntentos} intentos
        `;
    } else {
        historialPartida = `Partida: ${numeroPartida} | Tamaño del Tablero: ${cantidadElementos} elementos | Perdida
        `;
    }

    return historialPartida
}


//===========================//
///// ==== VARIABLES ===== ////
//===========================//

// Crear un array con tantos elementos como pares máximos se puedan utilizar
const elementos = ["🙈", "🙉", "🙊", "🐵", "🐺", "🐯", "🐷", "🐗", "🐼", "🐸", "🐙", "⭐", "😀", "🍂", "🤯", "🍊"];

// Crear una variable de intentos predefinida
let intentos = 5;

// Historial Global
let historialGlobal = "\nHistorial de Jugadas\n------------------\n";
let numeroPartida = 1;

// crear la variable para volver a jugar
let juegoSigue = true;


//==========================//
////======= JUEGO ========////
//==========================//

// Inciamos bucle|||| CONVERTIRLA A FUNCION
while (juegoSigue) {

    // pido al usuario que defina cantidad de Elementos
    let cantidadElementos = Number(prompt("Defina el tamaño del tablero, números pares entre 8 y 32 elementos"));

    // Chequeo si es válido el tamaño ingresado
    while (!((cantidadElementos >= 8 || cantidadElementos <= 32) && (cantidadElementos % 2) === 0)) {
        cantidadElementos = Number(prompt("Ingreso inválido.\nDefina el tamaño del tablero, números pares entre 8 y 32 elementos"));
    }

    // pido al usuario que defina la cantidad de intentos y luego lo asigno al contador de intentos
    intentos = prompt(`Ingrese la cantidad de intentos posibles. Los aciertos no cuentan.`);
    contadorIntentos = intentos;

    // crear array con elementos en juego para jugar una partida
    const listaElementosDelJuego = generarParesMezclados(elementos, cantidadElementos);

    // crear lista de elementos ocultos  que se irá actualizando con los aciertos
    let listaElementosOcultos = generarListaElementosOcultos(listaElementosDelJuego);

    let terminarJuego = false; // comienzo juego

    //// UNA PARTIDA |||| CONVERTIRLA A FUNCION
    while (!terminarJuego) {

        // actualizar el tablero oculto que se mostrará al jugador
        let tableroMuestroAJugador = mostrarArrayFormatoTablero(listaElementosOcultos);

        // Crear un array que contenga las coordenadas que ingresa el usuario
        let coordenadas = [];
        coordenadas.push(Number(prompt(tableroMuestroAJugador + "\nIngrese la posicion del primer elemento")) - 1); // posicion primer elemento

        // Chequeo si es válida la coordenada |||| CONVERTIRLA A FUNCION
        while (coordenadas[0] > cantidadElementos || !(listaElementosOcultos[coordenadas[0]] === "📦")) {
            coordenadas[0] = Number(prompt(tableroMuestroAJugador + "\nERROR\nIngrese la posicion CORRECTA del primer elemento")) - 1; // posicion primer elemento
        }
        listaElementosOcultos[coordenadas[0]] = listaElementosDelJuego[coordenadas[0]];

        // actualizar el tablero oculto que se mostrará al jugador
        tableroMuestroAJugador = mostrarArrayFormatoTablero(listaElementosOcultos);

        coordenadas.push(Number(prompt(tableroMuestroAJugador + "\nIngrese la posicion del segundo elemento")) - 1); // posicion segundo elemento

        // Chequeo si son válidas las coordenadas|||| CONVERTIRLA A FUNCION
        while ((coordenadas[0] === coordenadas[1]) || coordenadas[1] > cantidadElementos || !(listaElementosOcultos[coordenadas[1]] === "📦")) {
            coordenadas[1] = Number(prompt(tableroMuestroAJugador + "\nERROR\nIngrese la posicion CORRECTA del segundo elemento")) - 1; // posicion segundo elemento
        }

        listaElementosOcultos[coordenadas[1]] = listaElementosDelJuego[coordenadas[1]];

        // actualizar el tablero oculto que se mostrará al jugador
        tableroMuestroAJugador = mostrarArrayFormatoTablero(listaElementosOcultos);

        // Mostrar elección y resultado
        const resultadoIntento = mostrarArrayFormatoTablero(listaElementosOcultos) + mensajeConResultadoDeIntento(coordenadas, listaElementosDelJuego);

        alert(resultadoIntento)

        // Actualizar la lista de acuerdo al resultado de última jugada
        listaElementosOcultos = actualizarListaElementosOcultos(coordenadas, listaElementosDelJuego, listaElementosOcultos);


        // verificar si termina el juego
        if (contadorIntentos === 0 || !(listaElementosOcultos.includes("📦"))) {
            terminarJuego = true;
            alert("Fin del juego\n" + mostrarArrayFormatoTablero(listaElementosOcultos))
        } else {

            // Actualizar el conteo de intentos, si falló
            if (!chequearCoincidencia(coordenadas, listaElementosDelJuego)) {
                contadorIntentos--;
            }

            alert(`Le quedan ${contadorIntentos} intentos`)

        }
    }

    // Verificar si ganó la partida |||| CONVERTIRLA A FUNCION
    const resultado = listaElementosOcultos.includes("📦") ? "Perdió" : "Ganó";

    // Actualizo el historial Global de partidas
    historialGlobal += obtenerHistorialGlobal(resultado, intentos, contadorIntentos, numeroPartida, cantidadElementos);

    // Mensaje para la jugadora con toda la info y preguntar si quiere seguir jugando |||| CONVERTIRLA A FUNCION
    juegoSigue = confirm(`${resultado} esta partida.\n${historialGlobal}
    Desea seguir jugando?\nEl último tablero en juego:\n${mostrarArrayFormatoTablero(listaElementosDelJuego)}`);

    // Sumo un numero de partida
    numeroPartida++;

}

alert("Adios!" + historialGlobal)