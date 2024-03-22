////////////////////////////////
// Namespaces
////////////////////////////////

// c.d. z 11. enkapsulacja danych
namespace Architecture {
  export function getArea(width: number, height: number) {
    return width * height
  }
  // namespace in namespace
  export namespace Metric {
    export const inchInCm = 2.54
  }

}
const amount = 10 * Architecture.Metric.inchInCm
const area = Architecture.getArea(10, 20)

// z połączonej deklaracji namespace z innego pliku (11. enkapsulacja-danych.ts)
const city = Architecture.getCity()
const type = Architecture.getType()
// powyższe świeci bo ts nie widzi deklaracji namespace Architecture z której pochodzi .getCity i .getType

// rozwiązanie:
// tak nie możemy, bo nazwy się powielą
// import { Architecture } from './100 - enkapsulacja-danych'
// więc mówimy ts-owi że dodatek do Architecture mamy w kolejnym pliku - wystarczy w jednym pliku,
// nie trzeba robić tego samego w 100 - enkapsulacja-danych.ts
/// <reference path="./100 - enkapsulacja-danych.ts" />

// inny przykład - walidatory jako osobne funkcje w osobnych plikach wrzucone do jednego namespace (jak klasa Validators w Angularze)