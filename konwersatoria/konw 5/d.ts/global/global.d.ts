// nadpisywanie/zmiana globalnie dostępnych elementów
declare global {
  interface String {
    JsonToYAML(): string
  }
}
export {} // wymagane, inaczej błąd: Augmentations for the global scope can only be directly nested in external modules or ambient module declarations.ts(2669)