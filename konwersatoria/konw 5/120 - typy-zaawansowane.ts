////////////////////////////////////////////////////////
// Operator keyof - pobieramy klucze z typu obiektowego
////////////////////////////////////////////////
type Position = { lat: number; lng: number, planet: string }

type LatLng = keyof Position // 'lat' | 'lng' | 'planet'
const latOrLng: LatLng = 'lng'

const krakow: Position = { lat: 20, lng: 50, planet: 'earth' }
// dla typowania latOrLng: string ta zabawa się nie uda
const krakowLng = krakow[latOrLng]




////////////////////////////////////
// Indexed Access Types
// pobieramy typ właściwości obiektu
////////////////////////////////////
type Lng = Position['lng'] // number

// można też stosować unię typów
type LatLngPlanet = Position['lat' | 'lng' | 'planet'] // number | string

const l2: Lng = 53.12
// ex: chcemy pojemnik na krakow.lat powiązany z typem Position.lat
let krakowSzerokoscGeog!: number // Lng
// gdzieś za górą:
krakowSzerokoscGeog = krakow.lat
// powyższe działa, ale co się stanie gdy zmienimy typ dla Position.lat?






////////////////////////////////
// Typy warunkowe
////////////////////////////////
type CD = { type: 'CD' }
type BluRay = { type: 'BluRay' }
type Vinyl = { type: 'Vinyl' }
type DiscType = CD | BluRay | Vinyl

type LabelCD = { label: 'CD' }
type LabelBluRay = { label: 'BluRay' }
type LabelVinyl = { label: 'Vinyl' }

// chcemy uzyskać konkretny Label dla podanego DiscType:
// CD => LabelCD
// BluRay => LabelBluRay
// ...itd, taki if albo switch:)
// ternator w typach: extends, działa jak ===
type Label<T extends DiscType> = T extends CD ? LabelCD : T extends BluRay ? LabelBluRay : LabelVinyl
type CDLabel = Label<CD>
type BluRayLabel = Label<BluRay>
type VinylLabel = Label<Vinyl>

// uogólniamy i korzystamy z typu mapowanego (dla obiektów przykłady w sekcji Typy mapowane) oraz Template literals
type Label2<T extends string> = { label: `${T}` }
type VinylLabel2 = Label2<'Vinyl'>

// drugie rozwiązanie - indexed access type
interface LabelsMap {
  'CD': LabelCD,
  'BluRay': LabelBluRay,
  'Vinyl': LabelVinyl
}
type Label3<T extends DiscType> = LabelsMap[T['type']]
type CDLabel3 = Label3<CD>
// const x = document.querySelector('div')


////////////////////////////////////////////////////////////////////////
/// Typy warunkowe dla unii w generyku - Distributive Conditional Types
////////////////////////////////////////////////////////////////////////
// czyli po ludzku:
// 1. W typie generycznym podajemy unię
// 2. Dla tej unii chcemy zrobić typ warunkowy (T jest unią)
type TupleWithBoolean<T> = T extends any ? [T, boolean] : never
type StringAndNumberBooleanTuples = TupleWithBoolean<string | number>   // [string, boolean] | [number, boolean]

// gdyby nie było warunku:
type TupleWithBoolean2<T> = [T, boolean]
type StringAndNumberBooleanTuples2 = TupleWithBoolean2<string | number>  // [string | number, boolean]




////////////////////////////////
// Typy mapowane
////////////////////////////////
// wykorzystują typy generyczne i index signature by mapować typ generyczny na docelowy
type StringifyValues<Object> = {
  [Property in keyof Object]: string
}
// keyof Position = 'lat' | 'lng' | 'planet'
type StringPosition = StringifyValues<Position>

type NameValue<Object> = {
  [Property in keyof Object]: {
    name: string,
    value: Object[Property]
  }
}
type NameValuePosition = NameValue<Position>

// czasami chcemy widzieć więcej albo uprościć typ złożony
// killer:)
type Simplify<T> = {
  [P in keyof T]: T[P]
}
type LatLng2 = keyof Position // keyof Position
type LatLng3 = Simplify<keyof Position> // 'lat' | 'lng' | 'planet'


/////////////////////////////////////////////////////
// Typy mapowane - zmiana atrybutów właściwości typu
/////////////////////////////////////////////////////

// możemy używać modyfikatorów: (+-)readonly, (+-)?
type ReadOnly<Type> = {
  readonly [Property in keyof Type]: Type[Property]
}
type AllOptional<Type> = {
  [Property in keyof Type]+?: Type[Property]
}

type ReadonlyPosition = ReadOnly<Position> // Partial Utitilty type:)

////////////////////////////////
// operator infer
////////////////////////////////
type GetReturnType<Type> = Type extends (...args: any[]) => infer Return ? Return : never

type ReturnNumber = GetReturnType<() => number> //number
type Neverland = GetReturnType<string>         // never

// infer rest
type NieWiadomoCo = [number, string, null, boolean, 1, 'jeden']
type BezPierwszaka<T> = T extends [infer FirstElement, ...infer Rest] ? Rest : never
type DalejNieWiadomoCoAleKrotsze = BezPierwszaka<NieWiadomoCo>

const translations = {
  main: {
    ok: 'Ok',
    cancel: 'Anuluj',
  },
  dashboard: {
    chart: 'wykres'
  }
}

// unia typów z kluczy obiektów - świetne do autocomplete w kodzie (np. klucze z obiektu z tłumaczeniami)
type DottedKey<Key extends string> = Key extends '' ? '' : `.${Key}`
// type dkey = DottedKey<'ok'> // .ok

type KeysFromObject<SourceObject extends object> = {
  // @ts-expect-error
  [Key in keyof SourceObject]: `${Key}${DottedKey<CreateObjectKeyTypes<SourceObject[Key]>>}`
}[keyof SourceObject]

type CreateObjectKeyTypes<T> = T extends object ? KeysFromObject<T> : ''

type TranslationKeys = CreateObjectKeyTypes<typeof translations>



// Cwiczenie
// Masz trzy kategorie produktów w sklepie, każdej z nich odpowiada inny typ:
// 1. kategoria "gry planszowe" -> typ GryPlanszowe
// 2. kategoria "gry xbox" -> typ GryXbox
// 3. kategoria "gry playstation" -> typ GryPlaystation
// Mając type Gra {kategoria: j/w} utwórz typ zwracający typ odpowiedni dla kategorii
// przykład działającego rozwiązania TypKategorii<'gry xbox'> powinine zwrócić GryXBox

// A gdyby kategorii było 50?

// Cwiczenie - zamien model danych na FormGroup/FormControl
type User = {
  name: string,
  lastname: string,
  adress: {
    street: string,
    zipCode: string
  }
  age: number,
}
type FormGroup<T> = {}
type FormControl<T> = {}

type MapToForm<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Record<string, any>
  ? FormGroup<MapToForm<T[K]>>
  : FormControl<T[K]>
}

type UserForm = MapToForm<User>

export {}