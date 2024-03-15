/////////////////////////////////////////////////////////////////////////
// Literal types
// literały tworzymy dla string, number i boolean (lub ich kombinacji)
////////////////////////////////////////////////////////////////////////

// problem - zwracamy komunikaty z akcji - może być jedynie "udało się" albo "sorry!"
// niby ok ale odbierając taki komunikat nie mam pojęcia jaki string dostanę
const msg: string = 'pocałuj się w nos'

// lepsze rozwiązania:
enum WszystkieKomunikaty {
  ok = 'udalo sie',
  bad = 'sorry'
}
type Komunikat = 'udało się' | 'sorry!'
const msg2: Komunikat = "udało się"

// problem - mam funkcję która zwraca wynik rzutu kostką
type WynikRzutuKostka = number // no i mogę dostać 1589 albo np. -5

// wykorzystujemy unię literałów
type WynikRzutuKostkaSzescienna = 1 | 2 | 3 | 4 | 5 | 6
let kostka6: WynikRzutuKostkaSzescienna
// kostka6 = 7

// Cwiczenie
// (1) chcemy typ dla komunikatu z wiadomością i informacją czy jest ok czy jest źle
// popraw lipę poniżej:
type Komunikat2 = {
  sukcesKomunikat?: string,
  bladKomunikat?: string,
  sukces: boolean
}

const blednyKomunikat1: Komunikat2 = {
  sukces: false,
  sukcesKomunikat: 'Super!',
  bladKomunikat: 'No nie bałdzo:('
}

const blednyKomunikat2: Komunikat2 = {
  bladKomunikat: 'Do bani',
  sukces: true
}
if (blednyKomunikat1.sukces) {
  console.log(blednyKomunikat1.bladKomunikat)
}


// (2) rozwinięcie ćwiczenia - przyjmij że mamy trzy typu komunikatów: potwierdzenie, błąd, informacja
// błąd ma opis i kod błędu


// rozwiązanie (1)
// pozytywny komunikat, negatywny komunikat
type SukcesKomunikat = {
  sukces: true,
  sukcesKomunikat: string
}
type BladKomunikat = {
  sukces: false,
  bladKomunikat: string
}


type KomunikatZSerwera = BladKomunikat | SukcesKomunikat

const komunikat: KomunikatZSerwera = {
  sukces: false,
  // sukcesKomunikat: "Ok!"
  bladKomunikat: 'Lipa panie'
}
const negatywnyKomunikat: KomunikatZSerwera = {
  sukces: true,
  sukcesKomunikat: "Yupi, udało się!"
}

const lipnyKomunikatBoNietypowany = {
  sukces: false,
  sukcesKomunikat: 'Hemmmm'
}

type PotwierdzenieKomunikat = {
  type: 'potwierdzenie'
  komunikat: string
}
type Blad2Komunikat = {
  type: 'blad'
  komunikat: string,
  kodBledu: number
}
type InformacjaKomunikat = {
  type: 'informacja'
  komunikat: string
}
type KomunikatZSerwera2 = PotwierdzenieKomunikat | BladKomunikat | SukcesKomunikat
// powyższe konstrukcje nazywamy discriminated union