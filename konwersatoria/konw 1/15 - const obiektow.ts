////////////////////////////////
// Czy const jest zawsze const?
////////////////////////////////
const zaba = { kolor: 'zielony', znajomki: ['piggy', 'gonzo'] }
zaba.kolor = 'cała w bieli'
// tu nas przypilnuje typ, ale w js jest to ok
// zaba.x = 'asd'

// rozwiązanie: 
// 1. Object.freeze() - js, runtime way, 
// 2. "as const" lub ReadOnly utility type
const constZaba = { kolor: 'zielony', znajomki: [] } as const // deep const
// constZaba.kolor = 'czerwony'
// constZaba.znajomki.push('piggy')

// constZaba.kolor = 'biały'
const zimnaZaba = Object.freeze(zaba)
// zimnaZaba.kolor = 'niebieski'
zimnaZaba.znajomki.push('fazi') // Object.freeze robi shallow const

// kopiowanie obiektów zachowuje readonly
const klonZimnejZaby = Object.assign({}, zimnaZaba)
klonZimnejZaby.znajomki.push('scooter')


//////////////////////////
// podobnie z tablicami
//////////////////////////
const numerki = [1, 2, 3]
numerki.push(4)

// rozwiązanie: typ ReadonlyArray<T> lub as const
const numerki23: ReadonlyArray<number> = [1, 2, 3]
// numerki23.push(4)