
////////////////////////////////
// Zawężanie typów - type guards
////////////////////////////////

// problem - typ zmiennej jest zbyt ogólny lub też jest unią typów. 
// Chcemy się dowiedzieć z jakimi dokładnie danymi mamy do czynienia
function multByTwo(value: number | string): number {
  // @ts-expect-error
  return value * 2
}



////////////////////////////////
// GUARD 1 - typeof
// jest ok dla prymitywów
// nie sprawdza się dla typów obiektowych
////////////////////////////////
function multByTwoWithGuard(value: string | number): number {
  value
  if (typeof value === 'number') {
    return value * 2
  } else {
    // tutaj value musi być typu string (skoro nie jest number)
    return +value * 2
  }
}


////////////////////////////////////////////////////////////////////////////
// GUARD 2 - instanceof
// dla obiektów powstałych z klas/konstruktorów
// problem - nie można użyć typeof dla obiektów (zwróci po prostu "object")
// nie sprawdza się również gdy obiekty powstały jako literały
////////////////////////////////////////////////////////////////////////////

// ogólny interfejs
interface Pet {
  name: string
}

class Cat implements Pet {
  name = 'Garfield'
  meow() {}
}
class Dog implements Pet {
  name = 'Lessi'
  bark() {}
}
class Fish implements Pet {
  name = 'Wanda'
  bubble() {}
}

// function soundOfPet(Pet: Pet) {
//     Pet.meow(); // lub Pet.bark() itd
// }
function soundOfPet(pet: Pet) {
  if (pet instanceof Cat) {
    pet.meow()
  } else if (pet instanceof Dog) {
    pet.bark()
  } else if (pet instanceof Fish) {
    pet.bubble()
  }

}
// ale tak naprawdę - każdy zwierzak powinien zaimplementować jedną własną metodę sound() z Pet (zamiast meow, bark etc)


/////////////////////////////////////////////////////////////////////////////////////////
// GUARD 3 - in operator - kaczka rządzi
// rozwiązuje problem literałów obiektów 
// oraz kompatybilności co do określonej zawartości(struktura a nie nazwa klasy obiektu)
/////////////////////////////////////////////////////////////////////////////////////////

// nie można użyć Pet: Pet bo nie ma 'meow' i 'bark'
// function soundOfPet2(pet: Pet) {

// const isCat = (pet: Pet) => 'meow' in pet
function soundOfPet2(pet: Cat | Dog | Fish) {
  // if (isCat(pet)) {
  if ('meow' in pet) {
    pet.meow()
  } else if ('bark' in pet) {
    pet.bark()
  } else {
    pet.bubble()
  }
  // literał nazwy metody w if() jest niebezpieczny
  // po zmianie nazwy metody w klasie, literał pozostanie ten sam(błędny)
  // rozwiązanie: 
  // const catSound: keyof Cat = 'meow'
  // const dogSound: keyof Dog = 'bark'
  // const fishSound: keyof Fish = 'bubble'

}

////////////////////////////////
// GUARD 4 - type predicates 
////////////////////////////////

// stosujemy gdy  używamy tego samego warunku w wielu miejscach
// lub gdy sprawdzenie to dłuższy kawałek kodu
function isDog(pet: Pet): pet is Dog {
  return (pet as Dog).bark !== undefined
  // lub 
  // return pet.hasOwnProperty('bark');
  // lub bardziej bulletproof 
  // return Object.hasOwn(pet, 'bark')
}
function isCat(pet: Pet): pet is Cat {
  return (pet as Cat).meow !== undefined
}
function isFish(pet: Pet): pet is Fish {
  return (pet as Fish).bubble !== undefined
}

function soundOfPet3(pet: Cat | Dog | Fish) {
  if (isCat(pet)) {
    pet.meow()
  } else if (isDog(pet)) {
    pet.bark()
  } else {
    pet.bubble()
  }
}

// wewnątrz klasy możemy użyć this w predykacie
abstract class Klocek {
  jestKwadratem(): this is KlocekKwadrat {
    return this instanceof KlocekKwadrat
  }
  jestKula(): this is KlocekKula {
    return this instanceof KlocekKula
  }
}
class KlocekKwadrat extends Klocek {}
class KlocekKula extends Klocek {}

const klocek1 = new KlocekKwadrat()
const klocek2 = new KlocekKula()
klocek1.jestKula()
klocek1.jestKwadratem()
klocek2.jestKula()
klocek2.jestKwadratem()



//////////////////////////////////
// GUARD 5 - Discriminated union
//////////////////////////////////
// problem - jeden typ obiektu, szczegóły rozróżniamy po wartościach właściwości obiektu
// przykład prosty
interface Budynek {
  // rodzaj: string; // lipa
  rodzaj: 'dom' | 'stodoła' | 'dwór'
  kolor: string
}
// chcemy wykonać różne akcje w zależności od rodzaju budynku
function wyliczPodatek(budynek: Budynek) {
  if (budynek.rodzaj === 'dom') {
    return 100
  } else if (budynek.rodzaj == 'stodoła') {
    return 10
  } else if (budynek.rodzaj === 'dwór') {
    return 0      // szlachta nie płaci
  }
}

// przykład życiowy:
interface Obiekt {
  rodzaj: '2d' | '3d'
  // tylko dla 2d
  szerokosc?: number,
  dlugosc?: number
  // tylko dla 3d
  podstawa?: number,
  wysokosc?: number
}
const kwadrat: Obiekt = {
  rodzaj: '2d',
  szerokosc: 10,
  dlugosc: 20
}
const szescian: Obiekt = {
  rodzaj: '3d',
  podstawa: 100,
  wysokosc: 5
}
function oblicz(obiekt: Obiekt) {
  if (obiekt.rodzaj === '2d') {
    // ale wg interfejsu mam też dostępne tutaj podstawa i wysokosc:(
    return obiekt.szerokosc! * obiekt.dlugosc!
  } else {
    // lipa bo wszędzie muszę dawać ! (bo dałem ? w interfejsie)
    return obiekt.podstawa! * obiekt.wysokosc!
  }
}

// no to modelujemy inaczej
interface Obiekt2d {
  rodzaj: '2d'
  szerokosc: number,
  dlugosc: number
}
interface Obiekt3d {
  rodzaj: '3d'
  podstawa: number,
  wysokosc: number
}
interface Obiekt4d {
  rodzaj: '4d'
  objetosc: number,
  modyfikator: number
}

type Obiekt2 = Obiekt2d | Obiekt3d | Obiekt4d

// a jak rozbudujemy typ, to nas oblicz przypilnuje
// type Obiekt2 = Obiekt2d | Obiekt3d | Obiekt4d
function oblicz2(obiekt: Obiekt2) {
  switch (obiekt.rodzaj) {
    case '2d':
      return obiekt.szerokosc * obiekt.dlugosc
    case '3d':
      return obiekt.podstawa * obiekt.wysokosc
    case '4d':
      return obiekt.objetosc * obiekt.modyfikator
    default:
      const nvr: never = obiekt
      throw new Error('unknown object type!')
  }
}

/////////////////////////////////////
// GUARD 6 - Assertion functions
// Używamy gdy niespełnienie guarda 
// powinno przerwać wykonywanie kodu
/////////////////////////////////////

function jestObiektem2d(obiekt: Obiekt2): asserts obiekt is Obiekt2d {
  if (obiekt.rodzaj !== '2d') throw new Error('To nie jest obiekt 2d!')
}

type SystemPermissions = 'read' | 'write' | 'execute' | 'readwrite' | 'readexecute' | 'writeexecute' | 'readwriteexecute'
function hasReadAcces(perm: SystemPermissions): asserts perm is 'read' {
  if (!perm.includes('write')) throw new Error('You shall not pass!')
}


function genericAssert(condition: unknown, msg?: string): asserts condition {
  if (condition === false) throw new Error(msg)
}
const randomNumber = Math.random()
genericAssert(randomNumber == 10, "The number must be equal to 10")
randomNumber
// console.assert(randomNumber == 10)
