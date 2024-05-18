
import { computeValues, MyLib } from './myLibrary'

// skąd ts wie jaki jest typ elementu?
const iAmHtMlDivElement = document.querySelector('div')
const random = Math.random()

// dopisywanie własnych typów do istniejącego kodu - /myLibrary/index.d.ts
const retNumber = computeValues(1, 2)
const retString = computeValues('1', '2')
// @ts-expect-error
const retWhat = computeValues('1', 2)

const cart = MyLib.setCart({ total: 0, products: [] })

// deklaracja globalnie dostępnych elementów (np. z innego <script src="">)
declare var PUBLIC_SECRET_TOKEN: string //const - readonly, let - block scoped, var - global

// typy automatycznie zaczytane z /global/index.d.ts
helloWorld('Joe Black')