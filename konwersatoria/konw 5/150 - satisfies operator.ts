// problem: jak zatypować taki obiekt?
// Chcemy mieć szablony które mają klucze: primary, secondary, error
// oraz wartości [r,g,b] lub string (hex)
const untypedTheme = {
  primary: [120, 250, 120],
  secondary: "#00ff55",
  errr: "#ff0000" // tu mamy literówkę (error), złap ją!
}


// 1.
type Palettes = 'primary' | 'secondary' | 'error'
type RGB = [red: number, green: number, blue: number]

type Theme = {
  [Key in Palettes]: RGB | string
}
const theme: Theme = {
  primary: [120, 250, 120],
  secondary: "#00ff55",
  errr: "#ff0000" //literówka
}

// ale czy teraz wiemy czy w danym momencie primary to hex czy []?
// @ts-expect-error
theme.secondary.includes('#')


// 2. operator satisfies - zjeść ciastko i mieć ciastko
// czyli być zgodnym z Theme nie zmieniając własnego typu
const theme2 = {
  primary: [255, 255, 0],
  secondary: "#000000",
  error: [255, 0, 0]
} satisfies Theme

theme2.secondary.includes('#')
//// @ts-expect-error
theme2.error.includes('#')
