////////////////////////////////
// Template Literal Types
////////////////////////////////
type Msg = 'everything_is_ok' | 'something_went_wrong'
type MsgIdKey = `${Msg}_id_key`

type Cities1 = 'krakow' | 'wroclaw' | 'poznan'
type Cities2 = 'warszawa' | 'gdynia' | 'szczecin'
type CrossCities = `${Cities1}-${Cities2}`

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
// tego nie próbuj - wygeneruje wszystkie możliwe kombinacje
// type ZipCode = `${Digit}${Digit}-${Digit}${Digit}${Digit}`
// type ZipCode = '00-000' | '00-001' | '00-002' |  // ...
// zobacz w podpowiedzi:
type TwoDigits = `${Digit}${Digit}`

// Modyfikatory wbudowane (intrinsic):
// Uppercase<StringType>
// Lowercase <StringType>
// Capitalize <StringType>
// Uncapitalize<StringType>
type UserPropertyName = 'name'
type APIUserPropertyName = Uppercase<UserPropertyName>

type ValueInPx = `${number}px`

//// @ts-expect-error
const value: ValueInPx = '10px'

//Poprawna wartość:
const value2: ValueInPx = '256px'