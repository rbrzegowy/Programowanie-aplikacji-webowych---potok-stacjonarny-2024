////////////////////////////////
// Typowanie strukturalne
////////////////////////////////

class Drzewo {
  nazwa = 'dąb'
  wiek = 300
}

class Kwiat {
  nazwa = 'tulipan'
}

// Drzewo ma wszystko czego potrzebuje Kwiat
const kwiatek: Kwiat = new Drzewo()

const roza: Kwiat = { nazwa: 'róża' }
//@ts-expect-error
kwiatek.wiek

// tu mamy braki (wiek)
//@ts-expect-error
const drzewko: Drzewo = new Kwiat()


type Produkt = {
  cena: number
  nazwa: string
}
type Rachunek = {
  readonly wartoscZNapiwkiem: number
  pozycje?: Produkt[]
}
let przystawka: Produkt = {
  cena: 1000,
  nazwa: 'krewetki'
}
let wierzynek: Rachunek = {
  wartoscZNapiwkiem: 1010,
  pozycje: [przystawka]
}
// literał - typ inferowany z wartości
let sowa = {
  wartoscZNapiwkiem: 1_000_000,     // czytelniejszy zapis wartości obiadów
  pozycje: [przystawka],
  nagrywanieWCenie: true
}
// typowanie strukturalne działa - typ z literału jest zgodny z typem Rachunek
wierzynek = sowa // typeof sowaIPrzyjaciele --> Rachunek
