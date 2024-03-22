/////////////////////////////////////////////////////////////
// Enkapsulacja w funkcji
// jeśli zrobimy iife, to nie ma opcji na zniszczenie kodu
////////////////////////////////////////////////////////////
const galowie = (function (param: number) {
  const haslo = 'Cezar'
  console.log('Obeliks mówi: tajne hasło galów to ' + haslo + param)
  return {
    pobierzHaslo() {
      return haslo
    },
    postacie: ['asteriks', 'obeliks']
  }
})(12)


galowie.pobierzHaslo()
galowie.postacie

///////////////////////////////////////////////////////////////
// Enkapsulacja w klasie
// trzymać instancję w const żeby coś jej nie ruszyło
///////////////////////////////////////////////////////////////
class Rzymianin {
  #stolicaOjczyzny = 'Rzym'
  private gdzieIdzie() {
    return 'do Rzymu... a gdzie na ma iść...'
  }

}
const julek = new Rzymianin()

////////////////////////////////
// Wyrażenia - block scope: {}
////////////////////////////////

{
  // nie krzyczy błędu o ponownej inicjalizacji stałej
  const galowie = {}
}



////////////////////////////////
// Namespaces
////////////////////////////////

// namespace to starszy sposób enkapsulacji kodu, 
// aktualnie najczęściej wykorzystujemy moduły 
namespace Architecture {
  // zmienne zamknięte w Architecture (jak private w class)
  let type = 'urban'
  let city: string
  export function getCity() { return city }
  export function getType() { return type }
}
console.log(Architecture.Metric.inchInCm)
// namespaces mają fajną właściwość - można je składać z wielu plików
// w każdym pliku deklarujemy ten sam namespace
// c.d. 12. namespaces.ts