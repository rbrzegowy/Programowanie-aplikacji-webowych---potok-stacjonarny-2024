///////////////////////////////////////////////////////////////////
// Utility types - gotowce:)
// Pełna lista: 
// https://www.typescriptlang.org/docs/handbook/utility-types.html
///////////////////////////////////////////////////////////////////

// Partial
type WszystkoOpcjonalne = Partial<{ x: number, y: number }>

// Required
type WszystkoWymagane = Required<{ x?: number, y: number }>

// Readonly (shallow)
type WszystkoZamrozone = Readonly<{ x: number, y: number[] }>
// const xb: WszystkoZamrozone = { x: 1, y: [2] }
// xb.y.push(3)

// Pick
type TylkoImieIWiek = Pick<{ imie: string, nazwisko: string, wiek: number }, 'imie' | 'wiek'>

// Omit
type TylkoImieIWiek2 = Omit<{ imie: string, nazwisko: string, wiek: number }, 'nazwisko'>
// można zepsuć
type TylkoImieIWiek4 = Omit<{ imie: string, nazwisko: string, wiek: number }, 'nazw3isko'>
// keyof any
type SafeOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type TylkoImieIWiek3 = SafeOmit<{ imie: string, nazwisko: string, wiek: number }, 'n3azwisko'>

// Record
type AlbumId = string
type AlbumDescription = { title: string, description: string }
type SlownikAlbumow = Record<AlbumId, AlbumDescription>

// NonNullable
type NullableString = string | null
type AlwaysString = NonNullable<NullableString>

// Utility types można podglądnąć w lib.es5.d.ts - świetne źródło wiedzy!
type User5 = { name: string } | null
function userGetName(user: NonNullable<User5>) {
  console.log(user.name)
}