// opisywanie elementów ze skryptu, dwie sygnatury funkcji
export declare function computeValues(arg1: number, arg2: number): number
export declare function computeValues(arg1: string, arg2: string): string

// namespaces/interfejsy/klasy/typy wartości
export declare namespace MyLib {
  interface Cart {
    products: string[],
    total: number,
    createadAt?: Date
  }
  function setCart(cart: Cart): Cart

}

// gotowe repo typów do popularnych bibliotek js:
// https://github.com/DefinitelyTyped/DefinitelyTyped

