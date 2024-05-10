### Powiadomienia
- Zaprojektuj moduł powiadomień w aplikacji. Moduł (klasa) powinien udostępniać możliwość wysyłania powiadomień z dowolnego miejsca aplikacji
- Zaimplementuj licznik powiadomień (np. na pasku nawigacji).
- Zaimplementuj widok wszystkich powiadomień (po kliknięciu w licznik)
- Zaimplementuj wyskakujące powiadomienia (tylko dla powiadomień o prority 'medium' i 'high')

#### Model powiadomienia
```js
type ISOString = string
type Notification = {
  title: string,
  message: string,
  date: ISOString,
  prority: 'low'|'medium'|'high'
  }
```
