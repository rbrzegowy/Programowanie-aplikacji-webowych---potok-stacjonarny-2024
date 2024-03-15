////////////////////////////////
// Własne typy
// semantyka - nazwy typów zwyczajowo piszemy PascalCasem
// typ deklarujemy za pomocą słowa kluczowego 'type'
////////////////////////////////



////////////////////////////////
// Tuple - tutaj np. wartość wagi i jednostka wagi
////////////////////////////////
type Waga = [number, string]
const wagaMotyla: Waga = [6, 'gram']
type CityLatLong = [string, number, number]
const krakow: CityLatLong = ['Kraków', 50.049683, 19.944544]
// tuple z etykietami:
type ValueChange = [prev: number, next: number]

const newPrice: ValueChange = [100, 50]
newPrice

// tuple:
// 1. likwidują problem typowania tablic o różnym typie zawartości w poszczególnych polach
// type Waga: any[]
// type Waga: (number | string)[]
// 2. mają stała długość - uporządkowane (co do kolejności) kolekcje elementów

// tuple niestety są mało czytelne w użyciu:
const krakowLat = krakow[0] // a może krakow[1]?

// można ładniej:
// const wagaMotyla2 = {
//   wartosc: 6,
//   jednostka: 'gram',
// }
// type CityLatLng = {
//   name: string,
//   lat: number,
//   long: number,
// }

// użycie:
// 1. Parametry resztowe funkcji: 
function fnRest(reqArg: string, ...rest: [number, string, string]) {}
fnRest // zacznij nawias i zobacz na podpowiedź argumentów :)
// 2. i w drugą stronę - przekazywanie tupla jako parametry
const tup = [1, 'string', 'string2'] as const
fnRest('req', ...tup)
// 3. tuple można destrukturyzować z jednoznacznym typem
// array
const arr = [1, 2, 'trzy']
// detrukturyzacja tablicy - zobacz typy
const [jeden, dwa, trzy] = arr // typy dla jeden, dwa, trzy: string | number

// tuple
const t456: [number, number, string] = [4, 5, 'sześć']
const [cztery, piec, szesc] = t456 // typy: number, number, string


////////////////////////////////
// Typy obiektowe
////////////////////////////////
type Samochod = {
  model: string
  marka: string
}
type Garaz = {
  wlasciciel: string
  // ? oznacza że właściwość jest opcjonalna
  samochody?: Samochod[]
}

let mustang: Samochod = {
  marka: 'Ford',
  model: 'Mustang'
}

let maluch: Samochod = {
  marka: 'Fiat',
  model: '126P'
}
let garazKrzysia: Garaz = {
  wlasciciel: 'Krzyś',
  // samochody: []
}
// nie jesteśmy pewni czy krzyś ma samochody, więc ?.
garazKrzysia.samochody?.length

type User = {
  id: number,
  login: string,
  pass: string,
  name: string,
  age?: number,
  email?: string,
  gender?: string
  city?: string
}

type SomeObject = {
  width: number,
  height: number,
  type: string,
  pole: number,
  objetosc?: number
}
const box: SomeObject = {
  width: 10,
  height: 10,
  pole: 100,
  type: '2d',
  objetosc: 10
}
/////////////////////////////////////////////////////
// Typy dla funkcji
// bardzo fajnie pracują by podać typ dla callbacka
/////////////////////////////////////////////////////


type FilterFunction = (data: string) => boolean
function filtrujTekst(filter: FilterFunction, data: string[]) {
  return data.filter(val => filter(val))
}
const wszystkieNaA = (data: string): boolean => {
  return true //data.startsWith('a')
}
filtrujTekst(wszystkieNaA, ['Aneta', 'tomek', 'antek'])

///////////////////////////////////////////////////////
// Unie - wartość może być którymkolwiek z typów w unii
///////////////////////////////////////////////////////

// czy na pewno tak chcemy robić? Później wszędzie type guardy:)
type NiPiesNiWydra = string | number
const wydra: NiPiesNiWydra = 'wydra'


// ale już jako zestaw potecjalnie "podobnych" typów
type Pies = any
type Kot = any
type Zwierze = Pies | Kot

type Vege = 'Salatka' | 'Serek'
type Country = 'Stek' | 'Boczek'
type Supper = Vege | Country
const kolacja: Supper = 'Stek'


function zrobKolacjeVege(danie: 'Salatka' | 'Serek') {}
function zrobSniadanieCountry(danie: Country) {}
// function zrobSniadanieVege(danie: 'Salatka' | 'Serek') {}
function zrobKolacje(danie: Supper) {}

//////////////////////////////////////////////////////////
// Intersection (przecięcie) 
// typ powstający ze złączenia innych typów
///////////////////////////////////////////////////////////

type KlocekNieWiadomoCo = {
  id: string,
  kolor?: string,
  ksztalt?: string,
  obrot?: number
}

type Kolor = {
  kolor: string
}
type Ksztalt = {
  ksztalt: string
}
type Obrot = {
  obrot: 0 | 90 | 180 | 270
}
type KlocekTetris = Ksztalt & Kolor & Obrot
type KlocekTetrisBezObrotu = Ksztalt & Kolor

let klocek: KlocekTetrisBezObrotu = {
  kolor: 'red',
  ksztalt: 'L'
}

interface IKolor {
  kolor: string
}
interface IKsztalt {
  ksztalt: string
}
interface IKlocekTetrisBezObrotu extends IKolor, IKsztalt {
}
// lub
type KlocekTetrisBezObrotu2 = IKolor & IKsztalt // nie ma znaczenia jak powstał typ

const stalyKlocek: KlocekTetrisBezObrotu = {
  ksztalt: 'kolo',
  kolor: 'czerwony'
}
const LKlocek: KlocekTetris = {
  ksztalt: 'L',
  kolor: 'bialy',
  obrot: 0
}

////////////////////////////////
// Enumeratory
////////////////////////////////

// Enumy liczbowe
enum PermTypes {
  none,   // 0
  read,   // 1
  write,  // 2
  exec    // 3
}
let permReadWrite: PermTypes.read | PermTypes.write = PermTypes.read

// z możliwością wyliczenia wartości
const permString = 'write'
permReadWrite = PermTypes[permString]

// z przypisaną wartością
enum SmarterPermTypes {
  'none' = 1 << 0,  // 1
  'read' = 1 << 1,  // 2
  'write' = 1 << 2, // 4
  'exec' = 1 << 3   // 8
} // dlaczego smarter:)?

// const permissions: SmarterPermTypes[] = []

const readAndExecPerm = SmarterPermTypes.read | SmarterPermTypes.exec
readAndExecPerm & SmarterPermTypes.none
readAndExecPerm & SmarterPermTypes.read
readAndExecPerm & SmarterPermTypes.write
readAndExecPerm & SmarterPermTypes.exec

// Enumy tekstowe
enum StringPermTypes {
  none = 'none',
  read = 'read',
  write = 'write',
  execute = 'exec',
  executeAsAdmin = 'exec' //wartości mogą się duplikować, klucze nie
}

// type User2 = {
//   name: string,
//   permission: PermTypes
// }
// const tomekCoTylkoCzyta: User2 = {
//   name: 'tomek',
//   permission: PermTypes.read
// }

let userPerm: StringPermTypes = StringPermTypes.read // 'read'
// można też odwrotnie: 
PermTypes[1] // = 'read'
// uwaga na iterowanie po enumeratorach liczbowych
console.log(PermTypes)
for (const val of Object.entries(PermTypes)) {
  console.log(val)
}
// w tekstowych tego problemu nie ma
console.log(StringPermTypes)

// w enumach można też wyliczać wartość:
enum X {
  A = computeValue(),
  B = 2
}
function computeValue() { return 1 }

export {}