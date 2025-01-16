import Timer from "./timer";
import { getQuote } from "../fetch";

export class Test {
  constructor() {
      this.buttonElement = document.querySelector('#start-button');
      this.autorElement = document.querySelector('#autor');
      this.quoteElement = document.querySelector('#quote');
      this.finishElement = document.querySelector('#finish');
      this.pulsationsElement = document.querySelector('#pulsations');
      this.timer = new Timer;
      
      //Botón de incio de test
      this.buttonElement.addEventListener('click', () => {
          this.fetchQuote();
          this.startTest();
      })
  }

  async fetchQuote() {
    try {
      this.quoteElement.texContent = 'Cargando cita...'; //Mensaje de carga
      this.autorElement.textContent = 'Cargando autor...'; 
  
      const quote = await getQuote();
      if (quote) {
        this.quoteElement.textContent = quote.quote; //Cambiar el texto 
        this.autorElement.textContent = quote.author; //Cambiar el autor  
      }
    } catch (err){
      this.quoteElement.textContent = 'No se pudo cargar la cita.';
      console.log('Error al cargar el texto', err)
    }
  }

  changeButtonText() {
      const arrayText = ["Preparado?", "Listo?", "Adelante!"]
      let index = 0;
    
      const interval = setInterval(() => {
        if (index < arrayText.length) {
          this.buttonElement.textContent = arrayText[index];
          index++;
        } else {
          clearInterval(interval);
          this.buttonElement.classList.add('hidden')
        }
      }, 1000)
  }

  checkLetter(key, expectedLetter) {
    // Comparar las letras y asegurarse de que no haya diferencia de mayúsculas/minúsculas
    return key === expectedLetter;
  }

  calculatePulsationPerMinute(seconds, pulsations) {
    const ppm = pulsations/(seconds/60);
    const wpm = ppm/5;
    return wpm.toFixed(2);
  }

  startTest() {
    this.changeButtonText();
    setTimeout(() => {
      console.log('Prueba iniciada');
      this.timer.start();

      // Escoger el array de letras de la cita
      const arrayLetters = this.quoteElement.textContent.split('');
      console.log("Array de letras: ", arrayLetters);

      // Variables para controlar la posición y las pulsaciones
      let currentPosition = 0;
      let pulsations = 0;
      
      // Crear un contenedor con todo el texto (división en letras)
      this.quoteElement.innerHTML = '';
      const quoteContainer = document.createElement('div');
      this.quoteElement.appendChild(quoteContainer);

      // Crear el cursor
      const cursor = document.createElement('span');
      cursor.classList.add('cursor')
      quoteContainer.appendChild(cursor);

      // Insertar cada letra del texto en el contenedor, con un span para cada una
      arrayLetters.forEach((letter) => {
          const letterSpan = document.createElement('span');
          letterSpan.textContent = letter;
          letterSpan.classList.add('letter'); // Clase para cada letra
          quoteContainer.appendChild(letterSpan);
      });

      // Actualizar el texto y el cursor al escribir
      document.addEventListener('keydown', (event) => {
        const { key } = event;
        pulsations++; //Añádir pulsacion

        // Verificar si la tecla es la correcta
        if (this.checkLetter(key, arrayLetters[currentPosition])) {
          // Letra correcta
          quoteContainer.childNodes[currentPosition+1].style.color = '#00cd00'; 
          currentPosition++; // Avanzar en la cita
          
          // Calcular la posición del cursor
          const currentNode = quoteContainer.childNodes[currentPosition];
          if (currentNode) {
              const cursorX = currentNode.offsetLeft + 11; // Posición horizontal del carácter mas un caracter
              const cursorY = currentNode.offsetTop;  // Posición vertical del carácter

              // Mover el cursor a la nueva posición
              cursor.style.left = `${cursorX}px`;
              cursor.style.top = `${cursorY}px`;
          } 
          // Si ya se completó la cita
          if (currentPosition === arrayLetters.length) {
              this.timer.stop(); //Parar el tiempo
              this.finishElement.classList.remove('hidden'); //Ver final de prueba
              // Quitar el cursor
              cursor.classList.add('hidden');
              document.removeEventListener('keydown', arguments.caller); // Detener escucha de eventos
          }
        } else {
          // Resaltar el error pero esperando medio segundo.
          setTimeout(() => quoteContainer.childNodes[currentPosition+1].style.color = 'red', 500);
          
        }

        //Calcular y cambiar el elemento de pulsaciones
        this.pulsationsElement.textContent = this.calculatePulsationPerMinute(
          this.timer.getSeconds(), pulsations
        ).toString();
        event.preventDefault(); // Prevenir comportamiento por defecto
      });
    }, 4000);
  }
}