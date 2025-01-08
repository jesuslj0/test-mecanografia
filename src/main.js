import './style.css'
import Timer from './class/timer.js'
import { getQuote } from './fetch.js';

//Capturar elementos del DOM
const userTextInput = document.getElementById("user-text");
const startButton = document.getElementById("start-button");
const finishElement = document.getElementById("finish");

const timer = new Timer;

const fetchQuote = async() => {
  try {
    document.getElementById('text-quote').textContent = 'Cargando cita...'; //Mensaje de carga
    document.getElementById('autor').textContent = 'Cargando autor...'; 

    const quote = await getQuote();
    if (quote) {
      document.getElementById('text-quote').innerText = quote.quote; //Cambiar el texto 
      document.getElementById('autor').innerText = `Autor: ${quote.author}`; //Cambiar el autor  
    }
  } catch (err){
    document.getElementById('text-quote').textContent = 'No se pudo cargar la cita.';
    console.log('Error al cargar el texto', err)
  }
}

const changeButtonText = () => {
  const button = document.getElementById('start-button')
  const arrayText = ["Preparado?", "Listo?", "Adelante!"]
  let index = 0;

  const interval = setInterval(() => {
    if (index < arrayText.length) {
      button.textContent = arrayText[index];
      index++;
    } else {
      clearInterval(interval);
      button.classList.add('hidden')
    }
  }, 1000)
}

startButton.addEventListener('click', (event) => {
  event.preventDefault();
  //Fetch del texto
  fetchQuote();
  //Empezar prueba a los tres segundos
  changeButtonText();
  setTimeout(() => {
    startTest();
  }, 3000);
})

const startTest = () => {

  timer.start();

  const checkWord = (word) => {
    for (const i of arrayWordsQuote) {
      if (word == i) {
        return true, arrayWordsQuote.shift(); //Eliminar la palabra correcta del array
      } else return false;
    }
  }
  
  //Array de palabras 
  const arrayWordsQuote = document.getElementById('text-quote').textContent.split(" ");

  userTextInput.addEventListener('input', (event) => {
    event.preventDefault();
    const value = event.target.value;
    
    //Ver si la palabra coincide
    if (checkWord(value)) {
      setTimeout(() => {
        event.target.value = "";
      }, 200)
    }
    
    //Verificar el final de la prueba
    if (arrayWordsQuote.length == 0) {
      timer.stop();
      console.log("Prueba finalizada");
      finishElement.classList.remove('hidden')
    }
  })
}
