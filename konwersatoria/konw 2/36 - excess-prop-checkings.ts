/////////////////////////////
// Excess property checking
/////////////////////////////

type ColorBox = {
  color?: string
  width: number
  height: number
  id?: number
  isEmpty?(): boolean
}
function createBox(config: ColorBox): number {
  // [...]
  return config.width * config.height
  // return Math.random()
}

// @ts-expect-error
const newBox = createBox({ width: 10, height: 10, colour: 'red' })




// rozwiązania:
// 1. type assertion: { width: 10, height: 10, colour: 'red' } as ColorBox
const newBox2 = createBox({ width: 10, height: 10, colour: 'red' } as ColorBox)
// 2. przekazanie do funkcji stałej/zmiennej zamiast literału - excess checking wylączone
const z = { width: 10, height: 10, colour: 'red' }
const newBox3 = createBox(z)

// const boxConfig = {width:10, height: 10, colour: 'red'}
// 3. index signature w typie
// type ColorBox = {
//   color?: string
//   width: number,
//   height: number,
//   id?: number
//   isEmpty?(): boolean,
//   [key: string]: any
// }