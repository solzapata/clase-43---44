// Necesitamos 8 elementos
// Seleccionar de manera predefinida y al azar 4 (o la cantidad definida por usuario) de esos elementos, sin repetir
// el jugador ingresa una secuencia de elementos
// comparamos la secuencia ingresada con la secuencia aleatoria
// devuelve pistas (bolas negras para posición correcta y blancas color correcto posición incorrecta)
// se guarda el historial en cada vuelta y se muestra
// se sigue jugando hasta terminar las 15 vueltas o hasta adivinar la secuencia


// Crear una función que chequee si los elementos ingresados son válidos
const verificarValidez = (jugada, elementos) => {
    let esValido = true;
    for (let i = 0; i < jugada.length; i++) {
        if (!elementos.includes(jugada[i])) {
            esValido = false;
        }
    }
    return esValido
}

// Crear función que compare ambas secuencias y devuelva un array conteniendo las pistas
const compararSecuencias = (jugada, secuenciaRandom) => {
    const pistas = [];
    for (let i = 0; i < jugada.length; i++) {
        if (jugada[i] === secuenciaRandom[i]) {
            pistas.push("✔️");
        } else if (secuenciaRandom.includes(jugada[i])) {
            pistas.push("✖️");
        } else {
            pistas.push("❌");
        }
    }
    return pistas.sort();
}

// Crear una función que verifique si todas las pistas son bolas negras
const verificarSiGano = (pistas, cantidadElementos) => {
    let aciertos = 0;
    for (let i = 0; i < pistas.length; i++) {
        if (pistas[i] === "✔️") {
            aciertos++
        }
    }
    return aciertos === cantidadElementos;
}

// creo función para crear mensaje con historial de cada juego
const obtenerHistorial = (historialJugadas, historialPistas) => {
    let historial = "";
    for (let i = 0; i < historialJugadas.length; i++) {
        historial += `${historialJugadas[i].join(" ")} / ${historialPistas[i].join(" ")}\n`
    }
    return historial;
}

// creo una función para crear mensaje con el historial global del juego
const obtenerHistorialGlobal = (resultado, vueltas, conteoVueltas, numeroPartida) => {
    let historialPartida = "";
    if (resultado === "Ganó") {
        historialPartida = `Partida: ${numeroPartida} | Ganada | ${vueltas - conteoVueltas} intentos
        `;
    } else {
        historialPartida = `Partida: ${numeroPartida} | Perdida
        `;
    }
    return historialPartida
}


// Crear una función que seleccione la cantidad de elementos definida, al azar
const generarSecuencia = (elementos, cantidadElementos) => {
    const elementosRandom = [];
    while (elementosRandom.length < cantidadElementos) {
        let elementoRandom = elementos[Math.floor(Math.random() * (elementos.length - 1))];
        if (!(elementosRandom.includes(elementoRandom))) {
            elementosRandom.push(elementoRandom);
        }
    }
    return elementosRandom
}

// Creo un array con 8 elementos
    const elementos = ["ro", "ve", "am", "az", "vi", "ma", "ce", "ne"];
// crear variable de vueltas
    let vueltas = 15;
// crear variables para cantidad de elementos de la secuencia
    let cantidadElementos = 4;
// historial Global
    let historialGlobal = "\nHistorial de Jugadas\n------------------";
    let numeroPartida = 1;
// crear la variable para volver a jugar
    let juegoSigue = true;


// Inciamos bucle
while (juegoSigue) {
    let pistas = [];

    // historiales de partida única
    const historialJugadas = [];
    const historialPistas = [];

    // pido al usuario que defina 
    cantidadElementos = Number(prompt("Defina la cantidad de elementos de la secuencia, entre 4 y 8"));

    while (cantidadElementos > 8 || cantidadElementos < 4) {
        cantidadElementos = Number(prompt("Ingreso inválido.\nDefina la cantidad de elementos de la secuencia, entre 4 y 8"));
    }

    // Pido al usuario que defina las vueltas
    vueltas = prompt(`El juego está definido para ${vueltas} rondas. Ingrese la cantidad de rondas con las que desea jugar`);

    // defino el contador de vueltas
    let conteoVueltas = vueltas;

    // crear variable elementos random
    const secuenciaRandom = generarSecuencia(elementos, cantidadElementos);

    // variable bandera para entrar al juego    
    let terminarJuego = false;

    while(!terminarJuego){
        // Pedirle al usuario que ingrese su secuencia de elementos
        const historialJuego = obtenerHistorial(historialJugadas, historialPistas);
        const jugada = prompt(`Le quedan ${conteoVueltas} rondas.
        Posibles elementos: ${elementos} | Largo de secuencia: ${cantidadElementos}
        Ingrese una secuencia separada por comas. 
        ${historialJuego}`).split(",");

        if (jugada.length != secuenciaRandom.length || !verificarValidez(jugada, elementos)) {
            alert("Ingrese una opción válida")
        } else {
            // Llamar función que compare
            pistas = compararSecuencias(jugada, secuenciaRandom);

            // Crear un array 2D pusheando lo ingresado por el usuario y otro array 2D pusheando la pista
            historialJugadas.unshift(jugada);
            historialPistas.unshift(pistas);

            // Restarle 1 a las vueltas
            conteoVueltas--;

            // verificar si termina el juego
            if (conteoVueltas === 0 || verificarSiGano(pistas, cantidadElementos)) {
                terminarJuego = true;
            }
        }
    }
    
// Puede ser que las vueltas sean 0, pero que haya acertado el último intento.. por eso VERIFICO
    const resultado = verificarSiGano(pistas, cantidadElementos) ? "Ganó" : "Perdió";

// Actualizo el historial Global de partidas
    historialGlobal += obtenerHistorialGlobal(resultado, vueltas, conteoVueltas, numeroPartida);

// Mensaje para la jugadora con toda la info y preguntar si quiere seguir jugando
    juegoSigue = confirm(`${resultado} esta partida.\n${historialGlobal}
    Desea seguir jugando?`);

// Sumo un numero de partida
    numeroPartida++;
}