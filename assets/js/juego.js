/**
 * Blackjack
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Copas/Picas)
 */

const miModulo = (() => { //funcion anonima autoinvocada
    'use strict' //proteger el codigo

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    // referencias de HTML
    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
        puntosHTML = document.querySelectorAll('small');

    // esta funcion inicializa el juego
    const iniciarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];

        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        puntosHTML.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    // esta funcion crea un nuevo deck
    const crearDeck = () => {

        deck = [];
        //numeros del 2 al 10
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) { //tipos ['C','D','H','S']
                deck.push(i + tipo); //deck
            }
        }

        //cartas especiales ['A','J','Q','K']
        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo);
            }
        }

        // console.log( deck );
        return deck = _.shuffle(deck);//deck "barajeado"; shuffle de orden del deck
    }

    // Esta función me permite tomar una carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        // console.log(deck);
        // console.log(carta);//carta debe de ser de la baraja

        return deck.pop(); //pop() va a remover el ultimo elemento del arreglo y lo regresa;
    }

    //pedirCarta();

    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1); //.substring() regresa un nuevo string cortado en base a la pos inicial
        //remueve el ultimo caracter del string

        return (isNaN(valor)) ? //if isNaN = isNotaNumber
            (valor === 'A') ? 11 : 10 //if valor = 'A' entonces 11 else 10
            : valor * 1; //practica para convertir un string en valor numerico
        //regresa si el valor no es numerico, si el valor es 'A' o no y convierte el resultado(string) a numerico.
    }

    // const valor = valorCarta(pedirCarta());
    // console.log({ valor });

    //Turno: 0 = primer jugador y el último será la computadora
    const acumularPuntos = (carta, turno) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);// mismo codigo de puntosJugador 
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`; //3H, JD
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta)
    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {//funcion de js en milesimas de segundo
            if (puntosComputadora === puntosMinimos) { //puntos de comp y puntos de jugador
                alert('Nadie gana :(');
            } else if (puntosMinimos > 21) { //si los puntos de jugador rebasan los 21
                alert('Computadora gana')
            } else if (puntosComputadora > 21) { //si los puntos de comp rebasan los 21
                alert('Jugador Gana');
            } else { //default
                alert('Computadora Gana')
            }
        }, 100);//100 milesimas de segundo
    }

    // turno de la computadora
    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;

        do {//se tiene que ejecutar al menus una vez (tomar al menos una carta)
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1)
            crearCarta(carta, puntosJugadores.length - 1)

            if (puntosMinimos > 21) {//si el jugador tiene 22 o + pierde
                break;
            }

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        determinarGanador();

    }

    // Eventos
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

        if (puntosJugador > 21) {
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);

        } else if (puntosJugador === 21) {
            console.warn('21, genial!');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }

    });


    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugadores[0]);
    });

    // btnNuevo.addEventListener('click', () => {
    //     iniciarJuego();
    // });

    return {
        nuevoJuego: iniciarJuego
    };

})();

