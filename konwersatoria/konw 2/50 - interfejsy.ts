////////////////////////////////
// Interfejsy
////////////////////////////////

// deklaracja interfejsu
interface Package {
  fabric: string
}
class WoodPackage implements Package {
  fabric = 'wood'
}
class GlassPackage implements Package {
  fabric = 'glass'
}

// nieco więcej kontroli
interface Box {
  color?: string          // właściwość opcjonalna
  readonly id: number     // readonly 
  isEmpty?(): boolean     // funkcje
}

class BoxObject implements Box {
  id: number
  color = 'white'
  size = 'small' // a tego nie grali w interfejsie!
  constructor() {
    this.id = 1
  }

}

// skoro interfejs definiuje typ, to możliwe jest:
const anotherBox: Box = {
  color: 'red',
  id: 1
}

// anotherBox.id = 3 //err


//  rozszerzanie intefejsów
interface BoxWithDimensions extends Box { //można rozszerzać po wielu interfejsach
  width: number
  height: number
}


////////////////////////////////////
// implementacja wielu interfejsów
///////////////////////////////////

// width w XXX i BoxWithDimensions
// kompilator będzie krzyczał
interface StringWidth {
  // width: string
}
class FullBox implements StringWidth, BoxWithDimensions, Package {
  id = 1
  color = 'black'
  height = 20
  width = 12
  fabric = 'glass'
  isEmpty() {
    return true
  }
}

///////////////////////////////////////
// Łączenie interfejsów
//////////////////////////////////////

interface Api {
  key: string
}
interface Api {
  url: string
}
// missing: key, url
//@ts-expect-error
const api: Api = {}

//////////////////////////////////////////
// Klasa i interfejs o tej samej nazwie
//////////////////////////////////////////

interface Tv {
  brand: string
  model: string
}

// nieważne czy damy implements Tv czy nie - typ jest brany z tworzonej klasy
// class Tv implements Tv, TvWithWiFi{
class Tv {
  size: number = 65
  hasWifi: true = true
}

// jakie właściwości ma sony?
// przy korzystaniu z konstruktora typ z interfejsu nie klei się z klasą (właściwości z interfejsu nie są wymagane w klasie)
const sony = new Tv()

sony.size
// ale odwołując się do obiektu Tv interfejs jest już brany pod uwagę (bo typ powstały z klasy "klei" się z typem z interfejsu)
sony.brand
sony.model

// tutaj właściwości typu są brane z interfejsu i klasy (bo traktujemy Tv jak typ)
// @ts-expect-error
const samsung: Tv = {}


///////////////////////////
// interfejs dla funkcji
//////////////////////////
interface SortFunc {
  (source: string[], sortType: string): string[]
}
// funkcje mogą mnie argumentów niż argumenty wskazane w typie, nie mogą więcej niż ma typ
// funkcje muszą implementować zwracany typ
// why? Odziedziczone po korzystaniu z funkcji js - nie ma wymogu przekazywania wszystkich argumentów
let noSort: SortFunc = (data): string[] => {
  return data
}

///////////////////////////////////////////////////////////////////////////////////////////
// Index signature
// Problem który rozwiązujemy - typowanie dla obiektów o nieznanej liczbie właściwości 
// (ale znanej strukturze tych właściwości - słowniki)
// zobacz także: utility type Record<keyType,valueType>
//////////////////////////////////////////////////////////////////////////////////////////
type Kuchnia = {
  [skladnik: string]: number | string,
  name: string,
  lastname: string
}
type Kuchnia2 = {
  produkty: {
    [skladnik: string]: number
  },
  wlasciciel: {
    imie: string,
    nazwisko: string
  }
}
// type Kuchnia2 = Record<string, number>
const mojaKuchnia: Kuchnia2 = {
  produkty: {
    ryz: 12,
    chleb: 2,
    mleko: 4
  },
  wlasciciel: {
    nazwisko: 'kuchciński',
    imie: 'marek',
  }
  // makaron: '1kg'
}


// można mieszać index signature z innymi polami
// ale index signature musi to uwzględniać
interface KuchniaZWlascicielem {
  wlasciciel: string,
  czyMaKaseNaObiad: boolean,
  [skladnik: string]: number | string | boolean
}



// na koniec ciekawostka - interfejsy mogą dziedziczyć po klasach:)
// dziedziczą jedynie definicję typu, nie implementację!
















// Cwiczenie
// 1.utwórz interfejs dla obiektu przechowującego informacje o płytach CD.
// klucz to nazwa zespołu, wartości to nazwa albumu i piosenki w albumie
// 2. Dodaj do modelu nazwę i email właściciela kolekcji płyt

interface CdCollection {
  [artistOrBand: string]: {
    album: string,
    songs: { id: number, name: string }[]
  }
}
// dzięki Index signature mamy typowanie
const simplyTheBest: CdCollection = {
  'sting': {
    album: 'nothing like the sun', songs: [{ id: 1, name: 'fragile' }],
  },
  'u2': {
    album: 'the joshua tree', songs: [{ id: 1, name: 'where the streets have no name' }],
  },
  // błąd:
  // 'pearlJam': 123
}
const stingAlbums = simplyTheBest.sting

// Typ zawierający Index Signature może też zawierać dodatkowe pola
interface CdCollectionWithOwner {
  ownerName: string
  ownerEmail: string
  // index signature opisuje cały obiekt, więc jest też wymagane "| string" z uwagi na owner-a
  [propName: string]: { id: number, label: string } | string
}
const cds: CdCollectionWithOwner = {
  ownerName: 'Zosia',
  ownerEmail: 'zosia@samosia.pl',
  'u2': { id: 1, label: 'joshua tree' },
  'zenek': { id: 2, label: 'nigdy wiecej' },
  'pearl jam': 'sorry'
}
// cds['u2'].id
// Rozwiązanie powyższego problemu:
interface CdCollectionWithOwner2 {
  owner: CdOwner
  collection: CdCollection2
}
interface CdOwner {
  ownerName: string
  ownerEmail: string
}

interface CdCollection2 {
  [propName: string]: { id: number, label: string }
}

const rockColl: CdCollectionWithOwner = {
  ownerName: 'dave',
  ownerEmail: 'grohl',
  // 'nirvana': 'Nevermind'
}
