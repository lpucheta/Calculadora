const displayValorAnterior = document.getElementById('valor-anterior');
const displayValorActual = document.getElementById('valor-actual');
const botonesNumeros = document.querySelectorAll('.numero');
const botonesOperadores = document.querySelectorAll('.operador');
const botonLimpiar = document.querySelector('.limpiar');
const botonRetroceso = document.querySelector('.retroceso');
const botonIgual = document.querySelector('.igual');

let valorAnterior = '';
let valorActual = '';
let operador = null;
let resultadoMostrado = false;

//actualizacion del display
function actualizarDisplay(){
    displayValorAnterior.textContent = valorAnterior + ' ' + (operador || '');
    displayValorActual.textContent = valorActual;
}


//Evento para los botones numero
botonesNumeros.forEach(boton => {
    boton.addEventListener('click', () => {
        if(resultadoMostrado){
            valorActual = boton.textContent;
            resultadoMostrado = false;
        } else{
            valorActual += boton.textContent;
        }
        actualizarDisplay();
    })
});

botonesOperadores.forEach(boton =>{
    boton.addEventListener('click', () =>{
        if(valorActual === '') return;
        if(valorActual != ''){
            calcular();
        }
        operador = boton.textContent;
        valorAnterior = valorActual;
        valorActual= '';
        actualizarDisplay();
    })
})

botonIgual.addEventListener('click', () =>{
    if(valorActual === '' || valorAnterior === '') return;
    calcular();
    actualizarDisplay();
    displayValorAnterior.textContent= '';
    resultadoMostrado = true;
})

botonLimpiar.addEventListener('click', () =>{
    valorAnterior = '';
    valorActual = '';
    operador = null;  
    resultadoMostrado = false;
    actualizarDisplay();
})

botonRetroceso.addEventListener('click', () => {
    if (resultadoMostrado) return;
    if (valorActual !== '') {
        valorActual = valorActual.slice(0, -1);
    }
    actualizarDisplay();
});



function calcular(){
    let resultado;
    const anterior = parseInt(valorAnterior);
    const actual = parseInt(valorActual);

    console.log(`Operador: ${operador}`);
    console.log(`Anterior: ${anterior}`);
    console.log(`Actual: ${actual}`);

    if(isNaN(anterior) || isNaN(actual)) return;

    switch(operador){
        case '+':
            resultado = anterior + actual;
            break;
        case '-':
            resultado = anterior - actual;
            break;
        case '*':
            resultado = anterior * actual;
            break;
        case '%':
            if (actual === 0) {
                alert("No se puede dividir por cero");
                return;
            }
            resultado = Math.floor(anterior / actual); // División entera
            break;
        default:
            return;
    }

    console.log(`Resultado: ${resultado}`);

    valorActual = resultado.toString();
    operador = null;
    valorAnterior = '';
    resultadoMostrado = true;
    actualizarDisplay();

}


