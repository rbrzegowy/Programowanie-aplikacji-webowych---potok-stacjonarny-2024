
import { Subject, BehaviorSubject, filter, map, debounceTime, fromEvent } from 'rxjs'

const searchInput = document.querySelector('#searchString')
searchInput?.addEventListener('input', onSearch)


// bez strumieni
let timeoutHandler: any
function onSearch(ev: any) {
  // map
  const searchText = ev.target.value
  // filter
  if (searchText.length <= 1) {
    return
  }
  // timeout
  if (timeoutHandler) {
    clearTimeout(timeoutHandler)
  }
  timeoutHandler = setTimeout(() => {
    // map
    const data = { search: searchText }
    // efekt
    sendData(data)
  }, 2_000)
}
function sendData(data: { search: string }) {
  console.log(data)
}

// to samo w oparciu o strumień
const searchInput$ = fromEvent(document.querySelector('#searchString') as HTMLInputElement, 'input')
  .pipe(
    map(ev => (ev.target as HTMLInputElement).value),
    filter(searchString => searchString.length > 1),
    debounceTime(1000),
    map(searchString => ({ search: searchString })),

  )
searchInput$.subscribe(data => sendData(data))
