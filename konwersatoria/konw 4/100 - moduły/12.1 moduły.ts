////////////////////////////////
// Moduły (ECMAScript Modules)
////////////////////////////////

// domyślny system modułów (tsconfig.json) to CommonJS
// domyślny w Node: CommonJS
// domyślny na froncie: ECMAScript modules (poniżej, trzeba zmienić dyrektywę "module" w tsconfig.json

// UWAGA: plik zostanie potraktowany jako moduł dopiero gdy zrobi import lub eksport!
// "moduleDetection": "auto", /* Control what method is used to detect module-format JS files. */
// wymuszenie traktowania wszystkich plików jako moduły: dyrektywa moduleDetection: force

// eksportowanie danych
export class E1 {}
// i w innym pliku importujemy:
// import {E1} from xx.ts

export const E2 = 0
// import {E2} from xx.ts

export type TypeE4 = string

// ----------------
// domyślny export
// ----------------
const E3 = "E3"
// export default E3
// jeśli mamy export default to importujemy bez {}, np.:
// import defImp from xx.ts

// a tutaj tworzymy domyślny obiekt-worek z eksportami
// wygodny wgląd w to co jest eksportowane
export default { E1, E2, E3 }

// aliasy
// export { E1 as NazwaNaZewnatrz }
// import {NazwaNaZewnatrz} from xx.ts