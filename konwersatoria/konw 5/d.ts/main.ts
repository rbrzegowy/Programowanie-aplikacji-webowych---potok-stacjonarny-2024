
import { someSuperDuperFn } from './myLibrary'

// skąd ts wie jaki jest typ elementu?
const iAmHtMlDivElement = document.querySelector('div')
const random = Math.random()

// dopisywanie własnych typów do istniejącego kodu
// realnie funkcja jest dostarczana np. przez <script src="myLibrary.js">
const ret = someSuperDuperFn(1, 2)
ret

// https://github.com/DefinitelyTyped/DefinitelyTyped