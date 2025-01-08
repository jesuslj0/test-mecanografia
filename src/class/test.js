import Timer from "./timer";
import { getQuote } from "../fetch";

export class Test {
    constructor() {
        this.buttonElement = document.querySelector('#start-button')
        this.autorElement = document.querySelector('#autor')
        this.quoteElement = document.querySelector('#quote')
        this.userInput = document.querySelector('#user-text')
        this.finishElement = document.querySelector('#finish')
        this.timer = new Timer;
        
        //Botón de incio de test
        this.buttonElement.addEventListener('click', () => {
            this.fetchQuote();
            this.startTest();
        })
    }

    async fetchQuote() {
      try {
        this.quoteElement.textContent = 'Cargando cita...'; //Mensaje de carga
        this.autorElement.textContent = 'Cargando autor...'; 
    
        const quote = await getQuote();
        if (quote) {
          this.quoteElement.textContent = quote.quote; //Cambiar el texto 
          this.autorElement.textContent = `Autor: ${quote.author}`; //Cambiar el autor  
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

    startTest() {
        this.changeButtonText();
        setTimeout(() => {
            console.log('Prueba iniciada');
            this.timer.start();
        }, 4000)
    }

}