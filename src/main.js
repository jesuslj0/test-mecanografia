import './style.css'
import Timer from './class/timer.js'
import { getQuote } from './fetch.js';
import { Test } from './class/test.js';

document.addEventListener('DOMContentLoaded', () => {
  const test = new Test;
});


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

// startButton.addEventListener('click', (event) => {
//   event.preventDefault();
//   //Fetch del texto
//   fetchQuote();
//   //Empezar prueba a los tres segundos
//   changeButtonText();
//   setTimeout(() => {
//     startTest();
//   }, 3000);
// })

// const startTest = () => {

//   timer.start();

//   const checkWord = (word) => {
//     for (const i of arrayWordsQuote) {
//       if (word == i) {
//         return true, arrayWordsQuote.shift(); //Eliminar la palabra correcta del array
//       } else return false;
//     }
//   }
  
//   //Array de palabras 
//   const arrayWordsQuote = document.getElementById('text-quote').textContent.split(" ");

//   userTextInput.addEventListener('input', (event) => {
//     event.preventDefault();
//     const value = event.target.value;
    
//     //Ver si la palabra coincide
//     if (checkWord(value)) {
//       setTimeout(() => {
//         event.target.value = "";
//       }, 200)
//     }
    
//     //Verificar el final de la prueba
//     if (arrayWordsQuote.length == 0) {
//       timer.stop();
//       console.log("Prueba finalizada");
//       finishElement.classList.remove('hidden')
//     }
//   })
// }
