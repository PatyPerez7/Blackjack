/**
 * Blackjack
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Copas/Picas)
 */

let deck         = [];
const tipos      = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0, 
    puntosComputadora = 0;

// referencias de HTML
const btnPedir   = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo   = document.querySelector('#btnNuevo');

const divCartasJugador     = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const puntosHTML = document.querySelectorAll('small');

// esta funcion crea un nuevo deck
const crearDeck = () => {

    //numeros del 2 al 10
    for( let i = 2; i <= 10; i++ ) {
        for( let tipo of tipos ) { //tipos ['C','D','H','S']
            deck.push( i + tipo); //deck
        }
    }

    //cartas especiales ['A','J','Q','K']
    for( let tipo of tipos ) {
        for( let esp of especiales ) {
            deck.push( esp + tipo);
        }
    }

    // console.log( deck );
    deck = _.shuffle( deck );//deck "barajeado"; shuffle de orden del deck
    console.log( deck );
    return deck;
}

crearDeck();

// Esta función me permite tomar una carta
const pedirCarta = () => {
    if ( deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop(); //pop() va a remover el ultimo elemento del arreglo y lo regresa

    // console.log(deck);
    // console.log(carta);//carta debe de ser de la baraja
    return carta;
}

//pedirCarta();

const valorCarta = ( carta ) => {

    const valor = carta.substring(0, carta.length - 1); //.substring() regresa un nuevo string cortado en base a la pos inicial
    //remueve el ultimo caracter del string
    
        return ( isNaN( valor ) ) ? //if isNaN = isNotaNumber
            ( valor === 'A' ) ? 11 : 10 //if valor = 'A' entonces 11 else 10
            : valor * 1; //practica para convertir un string en valor numerico
        //regresa si el valor no es numerico, si el valor es 'A' o no y convierte el resultado(string) a numerico.
}

const valor = valorCarta(pedirCarta());
console.log({valor});

// turno de la computadora
const turnoComputadora = ( puntosMinimos ) => {

    do {//se tiene que ejecutar al menus una vez (tomar al menos una carta)
        const carta = pedirCarta(); 

        puntosComputadora = puntosComputadora + valorCarta( carta );// mismo codigo de puntosJugador 
        puntosHTML[1].innerText = puntosComputadora;
        
        // <img class="carta" src="assets/cartas/2C.png">
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`; //3H, JD
        imgCarta.classList.add('carta');
        divCartasComputadora.append( imgCarta );

        if( puntosMinimos > 21 ) {//si el jugador tiene 22 o + pierde
            break;
        }

    } while(  (puntosComputadora < puntosMinimos)  && (puntosMinimos <= 21 ) );

    setTimeout(() => {//funcion de js en milesimas de segundo
        if( puntosComputadora === puntosMinimos ) { //puntos de comp y puntos de jugador
            alert('Nadie gana :(');
        } else if ( puntosMinimos > 21 ) { //si los puntos de jugador rebasan los 21
            alert('Computadora gana')
        } else if( puntosComputadora > 21 ) { //si los puntos de comp rebasan los 21
            alert('Jugador Gana');
        } else { //default
            alert('Computadora Gana')
        }
    }, 100 );//100 milesimas de segundo
}


// Eventos
btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();
    // console.log(carta);
    
    puntosJugador = puntosJugador + valorCarta( carta );
    //console.log(puntosJugador); //puntos jugador -> suma de valor de cartas
    puntosHTML[0].innerText = puntosJugador; //modificacion de puntos de jugador en el texto de Jugador 1
    
    // <img class="carta" src="assets/cartas/2C.png">
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`; //3H, JD
    imgCarta.classList.add('carta'); //pedir cartas
    divCartasJugador.append( imgCarta );

    if ( puntosJugador > 21 ) {
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );

    } else if ( puntosJugador === 21 ) {
        console.warn('21, genial!');
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    }

    });


btnDetener.addEventListener('click', () => {
    btnPedir.disabled   = true;
    btnDetener.disabled = true;

    turnoComputadora( puntosJugador );
});

btnNuevo.addEventListener('click', () => {

    console.clear();
    deck = [];
    deck = crearDeck();

    puntosJugador     = 0;
    puntosComputadora = 0;
    
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled   = false;
    btnDetener.disabled = false;

});
