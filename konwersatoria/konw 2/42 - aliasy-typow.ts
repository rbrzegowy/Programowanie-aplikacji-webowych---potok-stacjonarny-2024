/////////////////
// Aliasy typów
/////////////////

type Cytat = string
const poranekKojota: Cytat[] = ["Kici, kici, taś, taś", "Do lwa ....?"]

// nazwa typu uściśla informację o przechowywanej wartości
type Komentarz = {
  tresc: string,
  czasOdPublikacji: number // minuty, godziny, lata?
}

// lepiej:
type Sekundy = number
type Komentarz2 = {
  tresc: string,
  czasOdPublikacji: Sekundy
}

type Kwota = number
// type Kwota = {
//   wartosc: number,
//   waluta: 'pln' | 'eur'
// }

type Zabawka = {
  nazwa: string,
  cena: Kwota,
}
const legoZabawka: Zabawka = {
  nazwa: 'statek piracki lego',
  // zł? euro? jenów?
  cena: 800
}
const ilosc = 3
// nie mam info w typie, to muszę skrobać zł w nazwie stałej
const wartoscZamowieniaZl = legoZabawka.cena * ilosc



type CenaPLN = number
type MasaWGramach = number
type CzasWSekundach = number
type Name = string

type ProduktX = {
  nazwa: string,
  masa: MasaWGramach,
  cena: CenaPLN,
  czasStworzenia: CzasWSekundach
}

const ryz: ProduktX = {
  nazwa: 'ryz',
  masa: 1200,
  cena: 10, //dalej mogę wpisać number - bo jest zgodny z CenaPLN
  czasStworzenia: 123
}
ryz.cena // tu typeof cena to niestety 'number' zamiast CenaPLN

// można wymusić zachowanie aliasów poprzez sztuczkę
interface EmptyInterface {}
type CenaEur = number & EmptyInterface
const eur12: CenaEur = 12
eur12 // tu typ to już CenaEur:)