///////////////////////////////////////////////
// Deklaracje prostych typów (tzw. prymitywów)
///////////////////////////////////////////////

// Semantyka - nazwy zmiennych piszemy camelCase-m
let rankingGracza: number = 123
let czyTurniejRozpoczety: boolean

// podanie wartości bez deklaracji typu - typ implikowany z wartości
let markaSamochodu = 'Tesla'

// old one
var dinozaur: string = 'diplodok'

// deklaracja stałych
const marka2: string = 'Fiat'

// dla const z typami implikowanymi jest nieco inaczej - zobacz jaki mamy tu typ!
const moc = 500
const zieloneTablice = false

////////////////////////////////////////////////////////////////
// literały obiektów
// typ jest inferowany z wartości - wstęp do typów obiektowych
////////////////////////////////////////////////////////////////
const produkt = {
  nazwa: 'ajfon',
  cena: 1_000_000,
}

//////////////////////////
// tablice
//////////////////////////
const szczesliweNumerki: number[] = [5, 3, 9]
// const szczesliweNumerki2: Array<number> = [5, 3, 9]


///////////////////////////
// Typy i wartości "puste"
///////////////////////////
let empty1 = undefined
let empty2 = null



///////////////////////////////////////
// użycie zmiennej przed incjalizacją
///////////////////////////////////////
let numerek: number
// spróbujemy użyć zmiennej przed jej inicjalizacją (uzupełnieniem wartością)
// numerek += 2 //err
// numerek = 0 
// numerek += 2

// a tu mówimy: wiem lepiej niż ts że będzie wartość w odpowiednim momencie
let numerek2!: number
// ...i wtedy musimy się pilnować:)
numerek2 += 2


////////////////////////////////////////////
// deklaracja elementu dostępnego globalnie 
// którego nie widzi ts
// np.z innego skryptu z html-a
////////////////////////////////////////////
declare let zmiennaZnikad: string
// ale także declare const, declare function itd

/////////////////////////////////////////////
// null i undefined przypisane do innego typu
/////////////////////////////////////////////
// domyślnie mamy włączone strictNullCheck w tsconfig.json
let osoba: string

// @ts-expect-error
osoba = undefined

// lub 
// @ts-ignore
osoba = null

// undefined == null
// if (osoba !== undefined && osoba !== null) {
// if (osoba != undefined) {
//   osoba && osoba.length
// }

// jeśli potrzebujesz przypisać null/undefined - zmień typ
let osobaLubNull: string | null = null
