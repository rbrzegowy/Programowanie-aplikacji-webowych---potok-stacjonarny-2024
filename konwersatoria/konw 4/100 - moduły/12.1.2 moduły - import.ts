// w nazwie pliku nie podajemy rozszerzenia
import { E1 as localE1, E2, NazwaNaZewnatrz } from './12.1 moduły'
// import defaultObject from './13.1 moduły.js'

// import całego modułu do jednej zmiennej - defaulta i reszty
import * as importAll from './12.1 moduły'

//import typu
// import E from './12.1 moduły'
const e4: E1 = ''

// lub lepiej explicite import type
// to gwarantuje usunięcie importu z wynikowego js-a
// (importujemy jedynie typ zamiast całej klasy)
import type { E1 } from './12.1 moduły'

// alias przy imporcie
localE1
E2

// defaultObject
NazwaNaZewnatrz
importAll.E1

// do reeksportu
const F1 = 'F1'
const F2 = 'F2'
const F3 = 'F3'
export { F1, F2, F3 }

if (true) {
  // tylko >=es2020
  // const mod = await import('./12.1 moduły')
  import('./12.1 moduły').then(mod => {
    // do smth with mod
  })
}
// lub
// const mod = await import ('./12.1 moduły')