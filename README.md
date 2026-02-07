# Pasieka BeeFi — strona pasieki pszczelej

Strona w kolorystyce **złoto–czarna**, zbudowana w **React + TypeScript** (Vite).

## Zakładki

- **Strona główna** — hero, wprowadzenie, zalety miodu
- **O nas** — historia, wartości, lokalizacje pasiek
- **Sklep** — lista produktów miodowych, koszyk, składanie zamówienia (propozycja pod rozwój)
- **Kontakt** — dane adresowe i formularz

## Lokalizacja (i18n)

Teksty są w pliku `src/locales/pl.ts`. Aby dodać angielski:

1. Skopiuj `pl.ts` jako `en.ts`.
2. Zamień wartości na angielskie, zachowując ten sam kształt obiektu (te same klucze).
3. W `src/locales/index.ts` dodaj `en` do `localeMap` i ustaw domyślny język lub przełącznik.

Dzięki temu w przyszłości łatwo włączyć np. `react-i18next` i przełączać języki.

## Sklep (propozycja)

- **Produkty** — lista miodów (lipowy, akacjowy, rzepakowy, wielokwiatowy, gryczany, spadziowy) z cenami i opisami.
- **Koszyk** — dodawanie/usuwanie, zmiana ilości, podsumowanie.
- **Zamówienie** — formularz (imię, e-mail, telefon, adres, uwagi). Wysłanie to na razie placeholder — w kolejnej wersji można podpiąć backend i płatności.

## Uruchomienie

```bash
npm install
npm run dev
```

Strona: `http://localhost:5173`

## Build

```bash
npm run build
npm run preview
```
