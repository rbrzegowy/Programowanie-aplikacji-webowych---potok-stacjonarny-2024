/////////////////////////////////
// Asercja typów
////////////////////////////////

// problem
// TS nie wie czy w html-u jest taki element, więc dopuszcza loginField === null
let passField = document.querySelector('#password') // typ querySelector<T>(): T | null
// pole #password to <input> więc będzie miało realnie typ HTMLInputElement

//@ts-expect-error
const pass = passField.value


// rozwiązanie 1
// let loginField = document.querySelector('#jakisInputTekstowy') as HTMLInputElement // precyzuje typ (i usuwa null z typu .querySelector<T>(): T | null)
// starszy sposób asercji
let loginField = <HTMLInputElement>document.querySelector('#jakisInputTekstowy')

let login = loginField.value

// rozwiązanie 2
login = (loginField as HTMLInputElement).value // ts - ja wiem lepiej co siedzi w html-u

// rozwiązanie 3
// dopuszczamy wartość null
let passField2 = document.querySelector<HTMLInputElement>('#password') // typ querySelector<T>(): T | null
const pass2 = passField2?.value
// lub
// let login = loginField!.value // ja wiem lepiej, na pewno nie ma null-a


{
  // rzutowanie dla przypadków beznadziejnych
  let a = 12
  let b: string
  //@ts-expect-error
  b = a // error - no bo jak?

  // przemoc rodzi przemoc
  b = a as any as string // brzydko, czasami wiemy lepiej niż typescript language service
  // jednak z praktyki - jeśli napotkasz powyższy przypadek - as any as xxx - to najczęściej błąd leży gdzieś wyżej w naszym kodzie
}