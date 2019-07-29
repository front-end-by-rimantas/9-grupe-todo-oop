"use strict";
import Todo from './todo.js';

const td = new Todo('#tasks');
// const td2 = new Todo('#tasks2');

// console.log( td );
// console.log( td2 );





class Zmogus {
    constructor ( vardas, amziu ) {
        this.vardas = vardas;
        this.amzius = amziu;
    }

    labas = () => {
        return `Labas, as esu ${this.vardas}!`;
    }

    arPilnametis = () => {
        if ( this.amzius >= 18 ) {
            return `Taip, ${this.vardas} yra pilnametis/-e.`;
        } else {
            return `Ne, ${this.vardas} nera pilnametis/-e.`;
        }
    }
}

let jonas = new Zmogus('Jonas', 99);
let maryte = new Zmogus('Maryte', 16);

console.log(jonas);
console.log(jonas.labas());
console.log(jonas.arPilnametis());
console.log(maryte);
console.log(maryte.labas());
console.log(maryte.arPilnametis());
