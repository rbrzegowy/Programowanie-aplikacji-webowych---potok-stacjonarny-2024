////////////////////////////////
// Typ any
////////////////////////////////

// co można z any? wszystko. 
let podanyTypAny: any = "jakiś X"
podanyTypAny = 100
podanyTypAny = [1, 2, 3]
podanyTypAny.jakasMetoda() // wyjątek na runtime

// bez deklaracji typu - "dynamiczne" any
let bezPodanegoTypu      // any
bezPodanegoTypu = 'kaska' // po tym przypisaniu 'zgubimy' any
bezPodanegoTypu// string
bezPodanegoTypu = true
bezPodanegoTypu
bezPodanegoTypu = undefined
bezPodanegoTypu
bezPodanegoTypu = null
bezPodanegoTypu
// a to się nie uda
// bezPodanegoTypu.jakasMetoda()

// ale zmieniać referencję dalej można:)
bezPodanegoTypu = true
bezPodanegoTypu           // boolean 🆗

// brak deklaracji typu i przypisanie "pustej" wartości
// również tworzy "any"
let rejestracja = null //lub undefined




////////////////////////////////
// Typ unknown
////////////////////////////////
let nieznanyX: unknown = "jakiś Y"
nieznanyX = 100
// przypisanie nie zmienia typu - bo jasno podaliśmy go wcześniej
nieznanyX = true
nieznanyX = { a: 2 }
// nieznanyX = [1, 2, 3]

// unknown nie wie nic o potencjalnych metodach
// @ts-expect-error
let jakisWynik = nieznanyX.jakasMetoda()

// const a: User = {}
// let b: SpecialUser = {}
// b = a as any as SpecialUser


////////////////////////////////
// Przypisywanie any i unknown 
////////////////////////////////
let tekst: string

// any można przypisać do KAŻDEGO typu
tekst = podanyTypAny

// unknown można przypisać jedynie do any i unknown 
// (taki proceder w ts generalnie nie ma sensu)
// const smiec: any = nieznanyX
// @ts-expect-error
tekst = nieznanyX





////////////////////////////////
// Typ never - tylko zajawka
////////////////////////////////
// co zwraca XX i jakiego typu jest zwracany typ?
function iCoJaRobieTuUuuu() {}


function killScript(): never {
  throw new Error('Hahahahaha!')
}
let never = killScript()
// never pokaże pazurki w typach warunkowych

// częste wykorzystanie never w switch-u - exhaustive value check
enum ABCD {
  a,
  b,
  c,
  // d   // odkomentuj mnie!
}
const abcd: ABCD = ABCD.a
function exhaustiveSwitch(val: ABCD): boolean {
  // to samo można zrobić dla if-a
  switch (val) {
    case ABCD.a:
      // do smth
      break
    case ABCD.b:
      // do smth
      break
    case ABCD.c:
      // do smth
      break
    // case ABCD.d:
    //   // do smth
    //   break
    default:
      // 1. runtime check
      // throw new Error('nie obsługiwany przypadek!')
      // 2. static exhaustive check
      const nvr: never = val
    // 3. eslint - switch-exhaustiveness-check
  }
  return true
}